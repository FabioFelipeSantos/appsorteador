document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("form-sorteador").addEventListener("submit", function (event) {
		event.preventDefault();

		let maxNum = document.getElementById("num-max").value;
		maxNum = parseInt(maxNum);

		let numeroAleatorio = Math.floor(Math.random() * maxNum + 1);

		const spanWithValue = document.getElementById("resultado-valor");

		spanWithValue.innerText = numeroAleatorio;
		spanWithValue.parentElement.style.animationName = "resultadoAnim";
	});
});
