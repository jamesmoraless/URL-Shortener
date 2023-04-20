const checkUsernameExists = "SELECT s FROM users WHERE s.username = $1";

module.exports = {
    checkUsernameExists,
}