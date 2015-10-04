﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;
using BLL.Payment;
using DAL.DomainModel.EnumProperties;
using Social.Models;

namespace Social.Controllers
{
    [System.Web.Http.RoutePrefix("api/payment")]
    public class PayController : BaseApiController
    {
        private readonly IPayService _payService;
        private readonly IRobokassaService _robokassaService;

        public PayController(IPayService payService, IRobokassaService robokassaService)
        {
            _payService = payService;
            _robokassaService = robokassaService;
        }

        [System.Web.Http.Authorize]
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("")]
        public ApiResult GetPayment()
        {
            var payment = _payService.GetPaymentStatus();
            return ApiResult(payment);
        }


        [System.Web.Http.Authorize]
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("pay")]
        public ApiResult InitPay(int tarifId, int systemId)
        {
            var result = _payService.InitPay((PayType) systemId, tarifId);
            var r = _robokassaService.CreateModel(result.PayModel.Id);
            InitPayVm initPay = new InitPayVm
            {
                Cost = result.PayModel.Cost + " " + result.PayModel.Currency,
                System = "Робокасса",
                Tarif = result.PayModel.Description,
                Form = RenderViewToString("Home", "~/Views/Shared/Partials/Pay/" + r.ViewName + ".cshtml", r)
            };
            return ApiResult(initPay);
        }

        public static string RenderViewToString(string controllerName, string viewName, object viewData)
        {
            using (var writer = new StringWriter())
            {
                var routeData = new RouteData();
                routeData.Values.Add("controller", controllerName);
                var fakeControllerContext = new ControllerContext(new HttpContextWrapper(new HttpContext(new HttpRequest(null, "http://google.com", null), new HttpResponse(null))), routeData, new HomeController());
                var razorViewEngine = new RazorViewEngine();
                var razorViewResult = razorViewEngine.FindView(fakeControllerContext, viewName, "", false);

                var viewContext = new ViewContext(fakeControllerContext, razorViewResult.View, new ViewDataDictionary(viewData), new TempDataDictionary(), writer);
                razorViewResult.View.Render(viewContext, writer);
                return writer.ToString();
            }
        }
    }

    public class InitPayVm
    {
        public string Tarif { get; set; }   
        public string Cost { get; set; }   
        public string System { get; set; }   
        public string Form { get; set; }   
    }
}