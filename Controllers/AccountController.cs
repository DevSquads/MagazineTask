using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Magazine.Auth;
using Magazine.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Magazine.Controllers
{
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(SignInManager<ApplicationUser> signInManager,UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }
        //GET Account/Register
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        //POST Account/Register
        public async Task<IActionResult> Register(UserViewModel adduser)
        {
            if (!ModelState.IsValid) return View(adduser);
            var user = new ApplicationUser()
            {
                UserName = adduser.UserName,
                Email = adduser.Email,
                Birthdate = adduser.Birthdate,
                City = adduser.City,
                Country = adduser.Country

            };
            IdentityResult result = await _userManager.CreateAsync(user, adduser.Password);
            if(result.Succeeded)
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Article");
                }

            foreach (IdentityError error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return View(adduser);

        }
        //GET Account/Login
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        //POST Account/Login
        public async Task<IActionResult> Login(LoginViewModel loginView)
        {
            if (!ModelState.IsValid) return View(loginView);
            var user =await _userManager.FindByNameAsync(loginView.UserName);
            if(user !=null)
            {
                var result = await _signInManager.PasswordSignInAsync(user, loginView.Password, false, false);
                if(result.Succeeded)
                {
                    return RedirectToAction("Index", "Article");
                }
            }
            ModelState.AddModelError("", "user Name / Password not found");
            return View(loginView);

        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Article");
        }
    }
}