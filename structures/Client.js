const { readdirSync } = require("fs");
const { REST, Routes, Client, Collection } = require('discord.js');
const { clientId, clientToken } = require("./configuration/index");

const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "MessageContent"
    ]
});

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

(async () => {
    await loadCommands();
    await loadEvents();
    await loadSlashCommands();
})()

client.login(clientToken).catch((error) => {
    console.log("\n🟥 Couldn't login to the bot. Please check the config file.")
    console.log(error)
    return process.exit()
})

process.on('unhandledRejection', error => {
    console.log("\n🟥 An unhandled rejection error occured.")
    console.log(error)
})

process.on('uncaughtException', error => {
    console.log("\n🟥 An uncaught exception error occured.")
    console.log(error)
})


async function loadCommands() {
    console.log("🟦 Loading commands...")

    readdirSync('./structures/commands/').forEach(dir => {
        const commands = readdirSync(`./structures/commands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of commands) {
            const pull = require(`./commands/${dir}/${file}`);

            try {
                if (!pull.name || !pull.description) {
                    console.log(`🟥 Couldn't load the command ${file}, error: Missing a name, description or run function.`)
                    continue;
                }

                pull.category = dir;
                client.commands.set(pull.name, pull);

                console.log(`🟩 Loaded Command : ${pull.name}`);
            } catch (err) {
                console.log(`🟥 Couldn't load the command ${file}, error: ${err}`)
                continue;
            }


            if (pull.aliases && Array.isArray(pull.aliases)) {
                pull.aliases.forEach(alias => client.aliases.set(alias, {
                    pull
                }))
            }
        }
    })
}

async function loadEvents() {
    console.log("\n🟦 Loading events...")

    readdirSync('./structures/events/').forEach(async (dir) => {
        const events = readdirSync(`./structures/events/${dir}`).filter((file) => file.endsWith(".js"));

        for (const file of events) {
            const pull = require(`./events/${dir}/${file}`);

            try {
                if (pull.name && typeof pull.name !== 'string') {
                    console.log(`🟥 Couldn't load the lavalink event ${file}, error: Property event should be string.`)
                    continue;
                }

                pull.name = pull.name || file.replace('.js', '');

                console.log(`🟩 Loaded Event: ${pull.name}`);
            } catch (err) {
                console.log(`🟥 Couldn't load the event ${file}, error: ${err}`)
                continue;
            }
        }
    });
}

async function loadSlashCommands() {
    console.log("\n🟦 Loading slash commands...")
    const slash = [];

    readdirSync('./structures/slashcommands/').forEach(async (dir) => {
        const commands = readdirSync(`./structures/slashcommands/${dir}`).filter((file) => file.endsWith(".js"));

        for (const file of commands) {
            const pull = require(`./slashcommands/${dir}/${file}`);

            try {
                if (!pull.name || !pull.description) {
                    console.log(`🟥 Couldn't load the slash command ${file}, error: Missing a name, description or run function.`)
                    continue;
                }

                const data = {};
                for (const key in pull) {
                    data[key.toLowerCase()] = pull[key];
                }

                slash.push(data);

                pull.category = dir;
                client.slashCommands.set(pull.name, pull);

                console.log(`🟩 Loaded Slash Command: ${pull.name}`);
            } catch (err) {
                console.log(`🟥 Couldn't load the slash command ${file}, error: ${err}`)
                continue;
            }
        }
    })

    if (!clientId) {
        console.log("🟥 Couldn't find the client ID in the config file")
        return process.exit()
    }

    const rest = new REST({ version: '10' }).setToken(clientToken);

    try {
        await rest.put(Routes.applicationCommands(clientId), { body: slash }).then(() => {
            console.log("\n🟩 Successfully registered application commands.")
        })
    } catch (error) {
        console.log("\n🟥 Couldn't register application commands.")
        console.log(error);
    }
}

module.exports = client;