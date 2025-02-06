document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input[type='radio']");
  
  inputs.forEach(input => {
      input.addEventListener("change", () => {
          const form = input.closest("form");
          const labels = form.querySelectorAll("label");
          
          labels.forEach(label => {
              label.classList.remove("correct", "incorrect");
          });
          
          const label = input.closest("label");
          if (input.classList.contains("true")) {
              label.classList.add("correct");
          } else {
              label.classList.add("incorrect");
          }
      });
  });
});
