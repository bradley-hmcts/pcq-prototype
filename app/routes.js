const express = require('express')
const router = express.Router()
const url = require('url')
const app = express()


// Add your routes here - above the module.exports line

//JHS 301019 get the usertype parameter from the url query string

var urlQueryUserType

router.get('/introduction', function(req, res) {
  // if the user type is passed as a string query, use that otherwise use the env var
  var userTypeInput = req.query.userType || req.app.locals.serviceUserTypeA

  // JHS 211109 set user action based on the user type passed in

    switch (userTypeInput) {
        case 'applicant':
          serviceUserAction = 'application'
          break
        case 'appellant':
          serviceUserAction = 'appeal'
          break
       case 'appointee':
          serviceUserAction = 'appeal'
          break
        case 'claimant':
          serviceUserAction = 'claim'
          break
        case 'respondent':
          serviceUserAction = 'response'
          break
        case 'defendant':
          serviceUserAction = 'case'
          break
        default:
          serviceUserAction = 'case'
          break

    }

  req.app.locals.serviceUserAction = serviceUserAction

// JHS 081119 if query string userType exists and a secondary (B) URL exists then set the userType to the query string value
  if (req.query.userType !== undefined && req.app.locals.serviceUserTypeB !== undefined) {
      urlQueryUserType = req.query.userType
  }
// JHS 081119 if query string userType doesn't exist then use the primary user type
  else {

    urlQueryUserType = req.app.locals.serviceUserTypeA

  }


// JHS 081119 set the returnUrl based on the userType.
  req.app.locals.serviceReturnUrl = chooseUrl()

  function chooseUrl() {
// If the query string user type  = the secondary (B) process.env user type and the secondary (B) process.env URL exists
    if (urlQueryUserType == req.app.locals.serviceUserTypeB && req.app.locals.serviceReturnUrlB !== undefined) {

      return req.app.locals.serviceReturnUrlB
    }
    else {
// set it to the primary (A) process.env URL
      return req.app.locals.serviceReturnUrlA
    }

  }
  // set the backLink to the service return url selected
  req.app.locals.backLink = req.app.locals.serviceReturnUrl + '/'

  res.render('introduction')

})

// Use the array of the page order, questionOrder,to determine the next page to go (on submit - post) and the back link page (on load - get)

// introduction

router.post('/introduction-next-q', function (req, res) {

// load the first question
    res.redirect('./' + questionOrder[0])

})


// age Back Link

router.get('/age', function(req, res) {
  var thisQ = 'age'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('age')
})

// age answer
router.post('/age-next-q', function (req, res) {
  let tellUsYourDob = req.session.data['tell-us-your-dob']

  if (tellUsYourDob == "yes") {
    res.redirect('/date-of-birth')
  }
  else {
    var nextQ
    var thisQ = 'age'
    for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
      }
    }
    res.redirect('/' + nextQ)
  }
})
// DoB Back Link

router.get('/date-of-birth', function(req, res) {
    req.app.locals.backLink = 'age'
  res.render('date-of-birth')
})
// DoB next question

router.post('/date-of-birth-next-q', function (req, res) {

  var nextQ
  var thisQ = 'age'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }

    res.redirect('./' + nextQ)

})

// language Back Link

router.get('/language', function(req, res) {
  var thisQ = 'language'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('language')
})

// language answer

router.post('/language-next-q', function (req, res) {

  let language = req.session.data['english-language']
  var nextQ
  var thisQ = 'language'

  if (language == 'other') {
    res.redirect('/english-level')
  }
  else {
    for (var i = 0; i < questionOrder.length; i++) {
      if (questionOrder[i] == thisQ) {
        nextQ = questionOrder[i + 1]
        break
      }
    }
    res.redirect('./' + nextQ)
  }
})

// english level
// english level Back Link set to language

router.get('/english-level', function(req, res) {
  req.app.locals.backLink = './language'
  res.render('english-level')
})

// set thisQ to language so that the next page is next in the array

router.post('/english-level-next-q', function (req, res) {

  var nextQ
  var thisQ = 'language'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }

    res.redirect('./' + nextQ) // going up a level to the nextQ

})

// sex Back Link

router.get('/sex', function(req, res) {
  var thisQ = 'sex'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('sex')
})

// sex next question

router.post('/sex-next-q', function (req, res) {

  var nextQ
  var thisQ = 'sex'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }

    res.redirect('./' + nextQ)

})

// gender Back Link

router.get('/gender', function(req, res) {
  var thisQ = 'gender'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('gender')
})

// gender next question

router.post('/gender-next-q', function (req, res) {

  var nextQ
  var thisQ = 'gender'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }

    res.redirect('./' + nextQ)

})

// sexual orientation Back Link

router.get('/sexual-orientation', function(req, res) {
  var thisQ = 'sexual-orientation'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('sexual-orientation')
})

// sexual orientation next question

router.post('/sexual-orientation-next-q', function (req, res) {

  var nextQ
  var thisQ = 'sexual-orientation'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }

    res.redirect('./' + nextQ)

})


// marriage Back Link

router.get('/marriage', function(req, res) {
  var thisQ = 'marriage'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('marriage')
})

// marriage next question

router.post('/marriage-next-q', function (req, res) {

  var nextQ
  var thisQ = 'marriage'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }
    res.redirect('./' + nextQ)

  })

// ethnicity Back Link

router.get('/ethnicity', function(req, res) {
  var thisQ = 'ethnicity'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('ethnicity')
})

// ethnicity answer next question and back link

router.post('/ethnicity-next-q', function (req, res) {
  let ethnicGroup = req.session.data['ethnic-group']

  if (ethnicGroup == "white") {
    req.app.locals.backLink = '../ethnicity'
    res.redirect('/ethnic-group/ethnicity-white')
  } else if (ethnicGroup == "mixed-or-multiple-ethnic-groups") {
    req.app.locals.backLink = '../ethnicity'
    res.redirect('/ethnic-group/ethnicity-mixed')
  } else if (ethnicGroup == "asian-or-asian-british") {
    req.app.locals.backLink = '../ethnicity'
    res.redirect('/ethnic-group/ethnicity-asian')
  } else if (ethnicGroup == "black-african-black-british-or-caribbean") {
    req.app.locals.backLink = '../ethnicity'
    res.redirect('/ethnic-group/ethnicity-black')
  } else if (ethnicGroup == "another-ethnic-group") {
    req.app.locals.backLink = '../ethnicity'
    res.redirect('/ethnic-group/ethnicity-another')
  } else {
    var nextQ
    var thisQ = 'ethnicity'
    for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }
    res.redirect('/' + nextQ)
  }

})

// ethicity sub pages next question

router.post('/ethnicity-type-next-q', function (req, res) {

  var nextQ
  var thisQ = 'ethnicity'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }
    res.redirect('./' + nextQ)

  })

// religion Back Link

router.get('/religion', function(req, res) {
  var thisQ = 'religion'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('religion')
})

// religion next question

router.post('/religion-next-q', function (req, res) {

  var nextQ
  var thisQ = 'religion'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }
    res.redirect('./' + nextQ)

  })

// disability Back Link

router.get('/disability', function(req, res) {
  var thisQ = 'disability'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('disability')
})


// disability answer next question

router.post('/disability-next-q', function (req, res) {

  let disabilityInformation = req.session.data['disability-information']

  if (disabilityInformation == 'yes') {
    req.app.locals.backLink = '../disability'
    res.redirect('/disability/disability-yes')
  } else {
    var nextQ
    var thisQ = 'disability'
    for (var i = 0; i < questionOrder.length; i++) {
      if (questionOrder[i] == thisQ) {
        nextQ = questionOrder[i + 1]
        break
      }
    }
    res.redirect('./' + nextQ)
  }

})

// disability yes next question

router.post('/disability-yes-next-q', function (req, res) {

  let disabilityYes = req.session.data['disability-yes']

  if (disabilityYes == 'yes-limited-a-little' || disabilityYes == 'yes-limited-a-lot') {
    req.app.locals.backLink = '../disability/disability-yes'
    res.redirect('/disability/disability-yes-detail')
  }
  else {
    var nextQ
    var thisQ = 'disability'
    for (var i = 0; i < questionOrder.length; i++) {
      if (questionOrder[i] == thisQ) {
        nextQ = questionOrder[i + 1]
        break
      }
  }

    res.redirect('./' + nextQ)
  }

})

// disability details

router.post('/disability-details-next-q', function (req, res) {

  var nextQ
  var thisQ = 'disability'
  for (var i = 0; i < questionOrder.length; i++) {
    if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }

    res.redirect('./' + nextQ)

})


// pregnancy Back Link

router.get('/pregnancy', function(req, res) {
  var thisQ = 'pregnancy'
  for (var i = 0; i < questionOrder.length; i++) {
    if (questionOrder[i] == thisQ) {
      // if this is the first page make the backLink the introduction
      if (i==0) {
        req.app.locals.backLink = './introduction'
        break
      }
      else {
      req.app.locals.backLink = './' + questionOrder[i - 1]
      break
      }
    }
  }
  res.render('pregnancy')
})


// pregnancy next question

router.post('/pregnancy-next-q', function (req, res) {

  var nextQ
  var thisQ = 'pregnancy'
  for (var i = 0; i < questionOrder.length; i++) {
     if (questionOrder[i] == thisQ) {
      nextQ = questionOrder[i + 1]
      break
    }
  }
    res.redirect('./' + nextQ)

})
module.exports = router
