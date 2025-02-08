
class HomeController {

    homeView(req, res){
        res.render('home/index', { layout: false });
    }

    sobreView(req, res){
        res.render('home/about', { })
    }

    servicosView(req, res){
        res.render('home/services', { })
    }

    contatoView(req, res){
        res.render('home/contact', { })
    }

}


module.exports = HomeController;