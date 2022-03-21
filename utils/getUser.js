module.exports = async (client, id, force) => {
    try {
        return await client.users.fetch(id, { force: force });
    }
    catch (error) {
        return undefined;
    }
};