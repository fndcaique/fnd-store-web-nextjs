export const removeMask = (value = ``) => value.replace(/[\D]/g, ``);

export const phoneMask = (value = ``) =>
  value
    .replace(/\D/g, ``) // Substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{11})\d+?$/, `$1`) // Apenas 11 dígitos
    .replace(/(\d{2})(\d+?)/, `($1) $2`) // (xx) ...
    .replace(/(\d{4,5})(\d{4}$)/, `$1-$2`); // (xx) 12345-6789 ou (xx) 1234-5678

export const cpfMask = (value = ``) =>
  value
    .replace(/\D/g, ``) // Substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, `$1.$2`) // Captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, `$1.$2`)
    .replace(/(\d{3})(\d{1,2})/, `$1-$2`)
    .replace(/(-\d{2})\d+?$/, `$1`);
