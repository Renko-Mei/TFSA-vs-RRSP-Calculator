# TFSA versus RRSP Calculator

## Description
The goal of this test is to create a financial calculator that compares using a TFSA (tax-free savings account) and RRSP (registered retirement savings plan) to save money.

RRSPs allow Canadians to defer paying taxes until they withdraw money from their account. In practice Canadians get a tax refund on the money they deposited into RSP. A TFSA, on the other hand, allows Canadians to save their after tax money in a way that the future growth (interest earned) remains tax-free forever so all future withdrawals are not taxed.

This calculator will require the following input fields

- Current Marginal Tax Rate - This is the highest income tax bracket of the “user”

- Average Tax Rate in Retirement - This is the average income tax the “user” pays in retirement

- Amount of Deposit - The amount of money being deposited in the comparison

- Years Invested - The number of years before this money is withdrawn again

- Return on Investment - Rate at which the invested money grows each year

- Inflation Rate - Expected rate of inflation each year (used to calculate the real rate of return)


It should produce the following results

- Amount of after-tax deposited in the TFSA vs RRSP (i.e., the RRSP deposit amount should be equivalent to the TFSA deposit in after-tax dollars, which should be larger considering that RRSP deposits are made tax-free)

- The future value (in today’s dollars) of the savings at the end of the investment period

- The tax paid upon withdrawal (only applies to money saved in the RRSP)

- The after-tax future value of the investment at the end of the investment period

## How to run
#### Main Application
You do not need to install anything, simply open `index.html`.

#### Testing
Open a shell at current directory, run:
```shell
npm install
node test.js
```
The test will open a browser, execute a full system test, and then close it. 
It will record failed tests in the console.


## Note
- Please use percentage instead of decimals (i.e. 25 vs. .25)