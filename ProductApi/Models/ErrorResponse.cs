namespace ProductApi.Models;

public class ErrorResponse
{
    public string Message { get; set; } = "An error occurred.";
    public string? Detail { get; set; }
    public string? TraceId { get; set; }
}
    