#!/usr/bin/env node
/*
  Basic Usage: In shell, execute `node complete-modulus.js`
  Modulus => Remainder
    Dividend/Divisor = Ratio = Quotient + Remainder/Divisor = "Quotient with Remainder"
    Dividend = Quotient*Divisor + Remainder
  Examples:
     7/3 =  2.333... =  2 w/ rem.  1        7 =  2(3) + 1
    -5/3 = -1.666..  = -1 w/ rem. -2       -5 = -1(3) - 2

*/


function Ratio(dividend, divisor) {
  let ratio = dividend/divisor;
  let quotient = Math.trunc(dividend/divisor);
  let remainder = dividend % divisor;

  console.log(`Testing that Math.trunc() provides the correct quotient...`);
  console.log('\n');
  console.log(`Dividend / Divisor = Ratio`);
  console.log(`${dividend} / ${divisor} = ${ratio} ~ ${quotient} with remainder ${remainder}`);
  console.log('\n');
  console.log(`Dividend = Quotient * Divisor + Remainder`);
  console.log(`${dividend} = ${quotient} * ${divisor} + ${remainder}`);
  console.log('\n');
  console.log('If looks good, looks like Math.trunc() is the correct function to use for quotient.');
  console.log('So keep in mind that Math.trunc() is the correct pair with modulation (modulus %).');
  console.log('\n');
  console.log('\n');
};

Ratio(7, 3);
Ratio(-5, 3);
