import * as TypePackageRecord from '../../cli/src/resource/type/record';
import demoData from '@/resource/data/demo';

const parseData: TypePackageRecord.packageAnaylzeResult[] =
    (globalThis as any)?.npmPackageAnalyzeResultList ?? demoData;

export function getPackageAnaylzeResult() {
    return parseData
}