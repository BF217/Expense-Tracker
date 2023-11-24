using Expenses.Core;
using Expenses.DB;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("ExpensesDB")));
builder.Services.AddTransient<IExpensesServices, ExpensesServices>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ExpensesPolicy", policyBuilder =>
    {
        policyBuilder.WithOrigins("*") // Be cautious with allowing all origins in production.
                   .AllowAnyHeader()
                   .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("ExpensesPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
