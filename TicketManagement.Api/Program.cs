using Microsoft.EntityFrameworkCore;
using TicketManagement.Api.Data;
using TicketManagement.Api.Services;

var builder = WebApplication.CreateBuilder (args);
builder.Services.AddDbContext<AppDbContext> (options =>
    options.UseSqlite (
        builder.Configuration.GetConnectionString ("DefaultConnection")));

// Add services to the container.
builder.Services.AddScoped<TicketService> ();

builder.Services.AddControllers ();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi ();
builder.Services.AddCors (options =>
{
    options.AddPolicy ("ReactClient", policy =>
    {
        policy.WithOrigins ("http://localhost:5173")
              .AllowAnyHeader ()
              .AllowAnyMethod ();
    });
});

var app = builder.Build ();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment ())
{
    app.MapOpenApi ();
}

app.UseHttpsRedirection ();
app.UseCors ("ReactClient");

app.UseAuthorization ();

app.MapControllers ();

app.Run ();
