module.exports.adminLogin = (req,res) => {
    return res.render("admin_login")
}

module.exports.adminSession = (req,res) => {
    return res.redirect("/admin/create_user")
}

module.exports.createUser = (req,res) => {
    return res.render("create_user")
}