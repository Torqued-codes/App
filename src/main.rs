use actix_cors::Cors;
use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use serde::{Serialize, Deserialize};
use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Task {
    id: i64,
    title: String,
    completed: bool,
}

#[derive(Deserialize)]
struct CreateTask {
    title: String,
}

#[derive(Deserialize)]
struct UpdateTask {
    title: Option<String>,
    completed: Option<bool>,
}

async fn get_tasks(db: web::Data<SqlitePool>) -> impl Responder {
    let tasks = sqlx::query_as!(
        Task,
        "SELECT id, title, completed as 'completed: bool' FROM tasks"
    )
    .fetch_all(db.get_ref())
    .await
    .unwrap_or_default();

    HttpResponse::Ok().json(tasks)
}

async fn create_task(
    db: web::Data<SqlitePool>,
    json: web::Json<CreateTask>
) -> impl Responder {
    let rec = sqlx::query!(
        "INSERT INTO tasks (title, completed) VALUES (?, ?) RETURNING id",
        json.title,
        false
    )
    .fetch_one(db.get_ref())
    .await
    .unwrap();

    HttpResponse::Created().json(Task {
        id: rec.id,
        title: json.title.clone(),
        completed: false,
    })
}

async fn update_task(
    db: web::Data<SqlitePool>,
    path: web::Path<i64>,
    json: web::Json<UpdateTask>
) -> impl Responder {
    let id = path.into_inner();

    // get current task
    let mut task = sqlx::query_as!(
        Task,
        "SELECT id, title, completed as 'completed: bool' FROM tasks WHERE id = ?",
        id
    )
    .fetch_one(db.get_ref())
    .await
    .unwrap();

    if let Some(title) = &json.title {
        task.title = title.clone();
    }
    if let Some(completed) = json.completed {
        task.completed = completed;
    }

    sqlx::query!(
        "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
        task.title, task.completed, id
    )
    .execute(db.get_ref())
    .await
    .unwrap();

    HttpResponse::Ok().json(task)
}

async fn delete_task(
    db: web::Data<SqlitePool>,
    path: web::Path<i64>
) -> impl Responder {
    let id = path.into_inner();

    sqlx::query!("DELETE FROM tasks WHERE id = ?", id)
        .execute(db.get_ref())
        .await
        .unwrap();

    HttpResponse::NoContent().finish()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Init database
    let db = SqlitePoolOptions::new()
        .max_connections(5)
        .connect("sqlite:tasks.db")
        .await
        .expect("Failed to create pool");

    // Create table if doesn't exist
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed BOOLEAN NOT NULL
        );"
    )
    .execute(&db)
    .await
    .expect("Failed to create table");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(db.clone()))
            .wrap(Cors::permissive())
            .route("/tasks", web::get().to(get_tasks))
            .route("/tasks", web::post().to(create_task))
            .route("/tasks/{id}", web::put().to(update_task))
            .route("/tasks/{id}", web::delete().to(delete_task))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}