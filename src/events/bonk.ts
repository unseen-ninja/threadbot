import type { ArgsOf } from "discordx"
import { Discord, On } from "discordx"

// @ts-ignore-error
import { errorHandler } from  "../utils/error_handler.ts"



@Discord()
export class Bonk {


  /*  AUTO THREAD
   *  Description: Checks the current channel against a given whitelist
   *               and creates a thread from a users message.
   */

  @On("messageCreate")
  async onMessage (
    [message]: ArgsOf<"messageCreate">
  ): Promise<void> {

    const triggers: Array<string> = ['lewd', 'horny', 'horni']

    if (
      !triggers.some((trigger: string) => message.content.includes(trigger)) ||
      message.author.bot
    ) return

    try {
      message.react('🇳')
      message.react('🇴')
      message.react('<dumbcat:610291728892690432>')
      message.reply('https://c.tenor.com/TKbDxDPCkegAAAAC/horny-jail-go-to-horny-jail.gif')
    } catch (error) { return errorHandler(message, error) }

  }

}
