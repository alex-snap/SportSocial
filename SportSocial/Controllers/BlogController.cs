﻿using System.Web;
using System.Web.Mvc;
using BLL.Blog;
using SportSocial.Controllers.Base;

namespace SportSocial.Controllers
{
    [Authorize]
    public class BlogController :SportSocialControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult New()
        {
            var rubrics = _blogService.GetRubrics();
            return View(rubrics);
        }

        //[HttpGet]
        //public ActionResult New()
        //{
        //    return View();
        //}

        //public ActionResult Image(HttpPostedFileBase image)
        //{
        //    if (image != null && image.ContentLength > 0)
        //    {
                
        //    }

        //}
        
	}
}