const TelegramApi = require("node-telegram-bot-api")

const token = "6322915951:AAE515WTCpx78RWN-MXmsOMa9Dc2UvWeDNE"

const bot = new TelegramApi(token, {polling: true})

let castingMessage = false

const commands = [
    {
        command: "start",
        description: "Запуск бота"
    },
    {
        command: "menu",
        description: "Открыть меню"
    }
]

bot.setMyCommands(commands);

bot.on("text", async msg => {
    try {
        const text = msg.text
        const chatId = msg.chat.id
        const myChatId = 375885694

        const subscribe = await bot.getChatMember(chatId, msg.from.id)
        if (subscribe.status !== "member") {
            return bot.sendMessage(chatId, `Для начала подпишись на канал https://t.me/ITeconomia`)
        }


        if (castingMessage === true && text !== "❌ Закрыть меню ❌" && text !== "/start" && text !== "/sendjoke") {
            await bot.sendMessage(myChatId, text)
            await bot.sendMessage(myChatId, msg.from.first_name)
            await bot.sendMessage(chatId, "Шутитка отправлена")
           return  castingMessage = false
        }

        if (text === "/start") {
            return bot.sendMessage(chatId, `Привет ${msg.from.first_name}! Выдай разрывную шутитку`, {
                reply_markup: {
                    resize_keyboard: true,
                    keyboard: [
                        ['⭐️ Отправить шутитку ⭐️'],
                        ['❌ Закрыть меню ❌']
                    ]

                }
            })
        }

        if (text === "/menu") {
            return  bot.sendMessage(chatId, `Меню бота`, {
                reply_markup: {
                    resize_keyboard: true,
                    keyboard: [
                        ['⭐️ Отправить шутитку ⭐️'],
                        ['❌ Закрыть меню ❌']
                    ]

                }
            })
        }

        if (text === "⭐️ Отправить шутитку ⭐️") {
            await bot.sendMessage(chatId, "Пиши шутитку")
          return   castingMessage = true
        }

        if (text === "❌ Закрыть меню ❌") {
            castingMessage = false
            return bot.sendMessage(chatId, 'Меню закрыто', {
                reply_markup: {
                    remove_keyboard: true
                }
            })
        }

        return bot.sendMessage(chatId, "Моя не понимать")

    } catch (e) {
        console.log(e)
    }

})

bot.on("callback_query", ctx => {
    console.log(ctx)
})