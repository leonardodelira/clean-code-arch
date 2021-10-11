import TaxTable from '../entity/TaxTable';
import TaxCalculator from './TaxCalculator';

export default class DefaultTaxCalculator extends TaxCalculator {
  getTax(taxTables: TaxTable[]): number {
    const taxTable = taxTables.find((tax) => tax.type === 'default');
    if (!taxTable) return 0;
    return taxTable.value;
  }
}
