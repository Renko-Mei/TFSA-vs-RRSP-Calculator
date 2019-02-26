new Vue({
  el: '#app',
  data: {
    curMarginalTaxRate: null, // This is the highest income tax bracket of the “user”
    avgRetireTaxRate: null, // Average income tax the “user” pays in retirement
    deposit: null, // Amount of money being deposited in the comparison
    yearsInvested: null, // Number of years before this money is withdrawn again
    investmentReturnRate: null, // Rate at which the invested money grows each year
    inflationRate: null, // Expected rate of inflation each year (used to calculate the real rate of return)
  },
  methods: {
    futureValue: function(val) {
      if (this.realReturnRate == 0 || this.yearsInvested == 0 || val == 0) {  
        return 0;
      }
      else {
        let fval = val * Math.pow((1 + this.realReturnRate / 100), this.yearsInvested);
        return Number(fval).toFixed(2);
      }
    }
  },
  computed: {
    incomeTax: function() {
      if (this.deposit != 0 && this.avgRetireTaxRate != 0) {
        return (this.deposit * this.avgRetireTaxRate / 100).toFixed(2);
      }
      else { return 0; }
    },
    // Net TFSA contribution (after deduction from income tax)
    netTFSAContribution: function() {
      return this.incomeTax != 0 ? (this.deposit - this.incomeTax).toFixed(2) : 0;
    },
    realReturnRate: function() {
      if (this.avgRetireTaxRate == 0 || this.inflationRate == 0) {  
        return 0;
      }
      else {
        let returnRate = this.investmentReturnRate / 100;
        let inflationRate = this.inflationRate / 100;
        let realRate = ((1 + returnRate) / (1 + inflationRate)) - 1;
        return (realRate * 100).toFixed(3);
      }
    },
    futureTFSAValue: function() {
      return this.futureValue(this.netTFSAContribution);
    },
    futureRRSPValue: function() {
      return this.futureValue(this.deposit);
    },
    taxUponWithdrawRRSP: function() {
      return (this.futureRRSPValue != 0 && this.curMarginalTaxRate != 0) ? 
        Number(this.futureRRSPValue * this.curMarginalTaxRate / 100).toFixed(2) :
        0;
    },
    netWithdrawRRSP: function() {
      return (this.taxUponWithdrawRRSP != 0 && this.futureRRSPValue != 0) ? 
        Number(this.futureRRSPValue - this.taxUponWithdrawRRSP).toFixed(2) :
        0;
    }
  }
});