using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace back_end_app.Utilities
{
    public class TypeBinder<T> : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var nameProperty = bindingContext.ModelName;
            var value = bindingContext.ValueProvider.GetValue(nameProperty);

            if (value == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }

            try
            {
                var valueDeserialized = JsonConvert.DeserializeObject<T>(value.FirstValue);
                bindingContext.Result = ModelBindingResult.Success(valueDeserialized);
            }
            catch
            {
                bindingContext.ModelState.TryAddModelError(nameProperty, "El valor dado no es del tipo adecuado");
            }

            return Task.CompletedTask;
        }
    }
}
