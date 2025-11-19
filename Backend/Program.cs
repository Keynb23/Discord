using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// 1. Add SignalR Service
builder.Services.AddSignalR();

// 2. Configure CORS to allow your React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            // Allowed origins must include both localhost (for desktop testing)
            // and your specific IP address (for laptop testing)
            builder.WithOrigins(
                       "http://localhost:5173",
                       "http://192.168.1.101:5173" // <--- YOUR IP ADDRESS HERE
                   )
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials(); 
        });
});

var app = builder.Build();

// app.UseHttpsRedirection(); // <--- Still commented out to avoid errors

// 3. Enable CORS
app.UseCors("AllowReactApp");

// 4. Map the Hub
app.MapHub<ChatHub>("/chathub");

app.Run();