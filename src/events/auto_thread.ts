import type { ArgsOf } from "discordx"
import { Discord, On } from "discordx"

// @ts-ignore-error
import { autoThreadWhitelist, threadHelpMessage } from "../../bot_config.js"

// @ts-ignore-error
import { errorHandler } from  "../utils/error_handler.ts"



@Discord()
export class AutoThread {


  /*  AUTO THREAD
   *  Description: Checks the current channel against a given whitelist
   *               and creates a thread from a users message.
   */

  @On("messageCreate")
  async onMessage (
    [message]: ArgsOf<"messageCreate">
  ): Promise<void> {

    if (
      !autoThreadWhitelist.includes(message.channelId) ||
      message.author.bot // Only humans can trigger auto threads.
    ) return

    try {
      const threadName = `${message.content.slice(0, 100)}`
      const newThread  = await message.startThread({ name: threadName })
      newThread.send(threadHelpMessage.replace('{{ author }}', message.author))
    } catch (error) { return errorHandler(message, error) }

  }

}
