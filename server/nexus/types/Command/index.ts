import { extendType, list, nonNull, stringArg } from 'nexus'
import { execCommand } from './resolvers/execCommand'

export const CommandExtendMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('execCommand', {
      type: 'JSON',
      description: 'Выполнение команды',
      args: {
        cwd: stringArg(),
        cmd: nonNull('String'),
        args: list(nonNull('String')),
      },
      resolve: execCommand,
    })
  },
})
