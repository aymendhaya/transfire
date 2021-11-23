/* eslint-disable no-console */
import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'

export default class Configurator extends Command {
  static description = 'Configure Google Cloud Service Account'

  static examples = ['$ transfire config sa --file=./path/to/my/serviceaccount.json']

  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({char: 'f', description: 'Service Account JSON path'}),

  }

  static args = [{name: 'ACTION'}]

  async run() {
    const {args, flags} = this.parse(Configurator)
    const configDir = this.config.configDir

    switch (args.ACTION) {
      case 'status':
        try {
          const saConfig = await fs.readJSON(path.join(this.config.configDir, 'serviceaccount.json'))
        console.log(`project configured with Google service account <${saConfig.client_email}> associated to the project <${saConfig.project_id}>`)
        } catch (error) {
          console.log('no service account associated to Transfire')
        }
        break;

        case 'sa':
          if(flags.file){
            try {
              const saConfig = await fs.readJSON(flags.file)
              fs.mkdir(this.config.configDir, function (err) {
                if (err) return err
              })
              fs.writeFile(path.join(configDir, 'serviceaccount.json'), JSON.stringify(saConfig), 'utf8', () => console.log(`project configured with Google service account <${saConfig.client_email}> associated to the project <${saConfig.project_id}>`))
            } catch (error) {
              console.log(error)
            }
          
          } 
          // ? console.log(flags.file) : console.log('please specify json file path')
          break;
    
      default:
        break;
    }

    // fs.mkdir(this.config.configDir, {recursive: true}, function (err) {
    //   if (err) return err
    //   fs.writeFile(path.join(configDir, 'serviceaccount.json'), JSON.stringify(serviceAccount), 'utf8', () => console.log('DONE'))
    // })
  }
}
