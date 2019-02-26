"use strict";
const webdriver = require("selenium-webdriver");
require('chromedriver');
const assert = require('assert');

var driver;

async function fullTest() {
	try {
		driver = new webdriver.Builder()
			.forBrowser('chrome')
			.build();

		await driver.get(__dirname + '/index.html');

		// Input the values
		sendKey("cur-mar-rate", "30");
		sendKey("avg-tax-rate", "25");
		sendKey("deposit", "1000");
		sendKey("years-invested", "5");
		sendKey("invest-return-rate", "5");
		sendKey("inflation-rate", "3");
		console.log("Finished inputs");

		sleep(3000);

		// Validate the values
		validate("tfsa-deposit", "$1000");
		validate("rrsp-deposit", "$1000");
		console.log("Finished validating first row");

		validate("tfsa-income-tax", "$250.00");
		validate("rrsp-income-tax", "N/A");
		console.log("Finished validating second row");

		validate("tfsa-contribution", "$750.00");
		validate("rrsp-contribution", "$1000");
		console.log("Finished validating third row");

		validate("real-return", "1.942%");
		console.log("Finished validating forth row");

		validate("future-value-key", "Value 5 years later @ 1.942% growth");
		validate("tfsa-future-value", "$825.71");
		validate("rrsp-future-value", "$1100.95");
		console.log("Finished validating fifth row");

		validate("tax-withdraw-key", "Tax upon withdrawal (30%)");
		validate("tfsa-tax-withdraw", "N/A");
		validate("rrsp-tax-withdraw", "$330.29");
		console.log("Finished validating second last row");

		validate("tfsa-net-withdraw", "$825.71");
		validate("rrsp-net-withdraw", "$770.66");
		console.log("Finished validating last row, test completed!");

		driver.quit();
	}
	catch (err) {
		handleFailure(err, driver);
		if (driver != null) {
			driver.quit();
		}
	}
}

function handleFailure(err, driver) {
	console.error('Something went wrong!\n', err.stack, '\n');
	driver.quit();
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

function sendKey(id, str) {
	driver.findElement(webdriver.By.id(id)).sendKeys(str);
}

function validate(id, val) {
	driver.findElement(webdriver.By.id(id))
		.getText().then(textValue => {
			assert.equal(val, textValue);
		});
}

fullTest();