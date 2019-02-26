new Vue({
  el: '#app',
  data: {
    curMarginalTaxRate: 0, // This is the highest income tax bracket of the “user”
    avgRetireTaxRate: 0, // Average income tax the “user” pays in retirement
    deposit: 0, // Amount of money being deposited in the comparison
    yearsInvested: 0, // Number of years before this money is withdrawn again
    investmentReturnRate: 0, // Rate at which the invested money grows each year
    inflationRate: 0, // Expected rate of inflation each year (used to calculate the real rate of return)
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
        return this.deposit * this.avgRetireTaxRate / 100;
      }
      else { return 0; }
    },
    // Net TFSA contribution (after deduction from income tax)
    netTFSAContribution: function() {
      return this.incomeTax != 0 ? this.deposit - this.incomeTax : 0;
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
        this.futureRRSPValue * this.curMarginalTaxRate / 100 :
        0;
    },
    netWithdrawRRSP: function() {
      return (this.taxUponWithdrawRRSP != 0 && this.futureRRSPValue != 0) ? 
        this.futureRRSPValue - this.taxUponWithdrawRRSP :
        0;
    }
  }
});