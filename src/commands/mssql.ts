/* eslint-disable no-console */
import {Command, flags} from '@oclif/command'
import {initializeApp, cert} from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'
import {connect, IRecordSet, Request} from 'mssql'
import {move, pick} from 'dot-object'
import * as path from 'path'

export default class MSSQLMigrator extends Command {

  static description = 'migrate a Microsoft SQL Server Table to Google Firestore document collections'

  static examples = ['$ transfire mssql MySQLTable CUSTOM_ID -d=mysqldb -s=192.168.10.12 -u=sa -p=myP@55word']

  static flags = {
    help: flags.help({char: 'h'}),
    database: flags.string({char: 'd', description: 'MSSQL Database name'}),
    username: flags.string({char: 'u', description: 'MSSQL Database Username'}),
    password: flags.string({char: 'p', description: 'MSSQL Database Password'}),
    server: flags.string({char: 's', description: 'MSSQL Database Host'}),

  }

  static args = [{name: 'MSSQLTABLENAME'}, {name: 'CUSTOM_ID'}]

  async run() {

    const {configDir} = this.config

    initializeApp({
      credential: cert(path.join(configDir, 'serviceaccount.json')),
    })

    const {args, flags} = this.parse(MSSQLMigrator)
    const sqlconf = {
      user: flags.username || 'sa',
      password: flags.password || 'Passp@55',
      server: flags.server || 'localhost',
      database: flags.database || 'master',
      options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,

      },
    }

    connect(sqlconf, function (err) {
      if (err) console.log(err)

      const dbs = getFirestore()
      const docRef = dbs.collection(args.MSSQLTABLENAME)

      const request = new Request()

      request.query('SELECT * from ' + args.MSSQLTABLENAME, function (err, recordset) {
        if (err) console.log(err)
        console.log(recordset?.recordset.length + ' records has been found')
        const data: IRecordSet<unknown> | undefined = recordset?.recordset
        const data2obj = data ? data
        .map((item: unknown): { [x: string]: unknown } => {
          const aux = item
          move(args.CUSTOM_ID || 'id', 'id', aux)
          const id = pick('id', aux)
          return ({[id]: aux})
        }) : undefined
        const newObj = data2obj ? Object.assign({}, ...data2obj) : {}
        Object.keys(newObj).map(index => {
          docRef.doc(index).set(newObj[index], {merge: true})
          console.log(`document <${index}> has been added to the collection [${args.MSSQLTABLENAME}]`)
        })
      })
    })
  }
}
