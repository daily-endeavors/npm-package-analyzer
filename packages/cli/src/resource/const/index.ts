import * as Type from '../type'
import path from 'node:path'

export const json: Type.json = {
  package_name: 'test',
  version: '1.2.3',
}

export const rootPath = path.resolve(__dirname, '../../../../..')
