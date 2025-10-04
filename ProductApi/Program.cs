using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Ensure Logs directory exists
var logFolder = Path.Combine(AppContext.BaseDirectory, "Logs");
if (!Directory.Exists(logFolder))
{
    Directory.CreateDirectory(logFolder);
}

// Read Serilog configuration from appsettings.json
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=products.db"));

builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

var env = app.Environment;
var logger = app.Services.GetRequiredService<ILogger<Program>>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var errorFeature = context.Features.Get<IExceptionHandlerFeature>();

        if (errorFeature != null)
        {
            logger.LogError(errorFeature.Error, "An unhandled exception occurred");

            var errorResponse = new ErrorResponse
            {
                Message = "An unexpected error occurred.",
                TraceId = context.TraceIdentifier
            };

            if (env.IsDevelopment())
            {
                errorResponse.Detail = errorFeature.Error.ToString();
            }

            await context.Response.WriteAsJsonAsync(errorResponse);
        }
    });
});

// Perform database migration on startup
using (var scope = app.Services.CreateScope())
{
    logger.LogInformation("Migrating database...");
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    logger.LogInformation("Migration complete.");
}

app.MapControllers();

Log.Information("Starting web host...");
app.Run();
