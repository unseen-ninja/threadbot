import { CommandInteraction } from "discord.js"
import { Discord, Slash } from "discordx"

// @ts-ignore-error
import { errorHandler } from  "../utils/error_handler.ts"



/*  TEST COMMAND
 *  Description: This is just a test command. It does whatever you tell it to do.
 */

@Discord()
export class Test {

  @Slash("test")
  async test (
    interaction: CommandInteraction
  ): Promise<void> {

    try {
      const error = 'test command'
      return errorHandler(interaction, error)
    } catch { return interaction.reply('even the error handler died') }

  }

}
