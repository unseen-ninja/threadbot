import { CommandInteraction } from "discord.js"
import { Discord, Slash, SlashGroup, SlashOption } from "discordx"

// @ts-ignore-error
import { permissionWhitelist } from  "../../bot_config.js"

// @ts-ignore-error
import { errorHandler } from  "../utils/error_handler.ts"



@Discord()
@SlashGroup({ name: "thread" })
export class ThreadCommands {

  /* UTILITIES
   */

  isThreadChannel(interaction: any): boolean {
    return interaction.channel.type != 'GUILD_PUBLIC_THREAD'
  }


  async canEditThread(interaction: any): Promise<boolean> {
    const init = await interaction.channel.fetchStarterMessage()
    return (
      permissionWhitelist.includes(interaction.user.id) ||
      interaction.user.id == init.author.id
    )
  }



  /*  THREAD RENAME
   *  Description: Checks for thread channel and the users permissions
   *               to change the thread title to a given argument.
   */

  @Slash("rename")
  @SlashGroup("thread")
  async ThreadCommands (
    @SlashOption("name") name: string,
    interaction: CommandInteraction
  ): Promise<void> {

    if (this.isThreadChannel(interaction)) {
      return interaction.reply({ content: 'This isn\'t a Thread', ephemeral: true })
    }

    if (!await this.canEditThread(interaction)) {
      return interaction.reply({ content: 'You\'re not allowed to edit this Thread', ephemeral: true })
    }

    try {
      // This should never throw an error due to the guard clauses above.
      // @ts-ignore-error
      await interaction.channel.setName(`${name.slice(0, 100)}`)
      return interaction.reply({ content: 'Your Thread has been renamed', ephemeral: true })
    } catch (error) { return errorHandler(interaction, error) }

  }

}
