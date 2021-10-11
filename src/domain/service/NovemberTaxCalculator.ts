import { Item } from '../entity/Item';
import TaxTable from '../entity/TaxTable';
import TaxCalculator from './TaxCalculator';

export default class NovemberTaxCalculator extends TaxCalculator {
  getTax(taxTables: TaxTable[]): number {
    const taxTable = taxTables.find((tax) => tax.type === 'november');
    if (!taxTable) return 0;
    return taxTable.value;
  }
}
