const { getAppointment, getPasscode, verifyPasscode, registerUser } = require("../services/user")

const expect = require('chai').expect

describe("appointment", () => {
  const users = [
    {
      mobileNumber: "9824527094",
      uid: "1236548054789"
    },
    {
      mobileNumber: "9904413700",
      uid: "9896548054789"
    },
    {
      mobileNumber: "9824111700",
      uid: "1290444687789"
    },
    {
      mobileNumber: "9876201450",
      uid: "1236569874789"
    },
    {
      mobileNumber: "9944668752",
      uid: "1236548059460"
    }
  ]
  before(() => {
    const userManager = new (require("../database/user"))()
    users.map(user => userManager.create(user))

    const appointments = []
    const appointmentManager = new (require("../database/appointment"))()

    appointments.map(appointment => appointmentManager.create(appointment))
  })

  after(() => {
    const appointmentManager = new (require("../database/appointment"))()
    const appointments = appointmentManager.fetchAll()

    appointments.map(appointment => appointmentManager.delete(appointment._id))

    const userManager = new (require("../database/user"))()
    users.map(user => userManager.delete(user._id))
  })

  it("should get an appointment when an appointment exists", () => {
    users.map(user => expect(getAppointment(user.uid)).to.be.a("object"))
  })

  it("should return false when no appointment exists", () => {
    const data = [
      {
        mobileNumber: "7724527094",
        uid: "8836548054789"
      },
      {
        mobileNumber: "9904333700",
        uid: "9896648054789"
      },
      {
        mobileNumber: "9824119900",
        uid: "1290444687789"
      },
      {
        mobileNumber: "9226201450",
        uid: "1236577874789"
      },
      {
        mobileNumber: "9004668752",
        uid: "1266548059460"
      }
    ]
    data.map(item => expect(getAppointment(item)).to.be.false)
  })
})

describe("passcode", () => {
  it("should get a passcode", () => {
    expect(getPasscode()).to.be.a("string")
  })

  it("should get a true passcode verification status", () => {
    const data = [
      {
        mobileNumber: "9745681203",
        passcode: "78965"
      },
      {
        mobileNumber: "9745681003",
        passcode: "12789"
      },
      {
        mobileNumber: "6745681203",
        passcode: "78436"
      },
      {
        mobileNumber: "9745688203",
        passcode: "57897"
      },
      {
        mobileNumber: "8945681203",
        passcode: "12336"
      }
    ]
    data.map(item => expect(verifyPasscode(item.mobileNumber, item.passcode)).to.be.true)
  })

  it("should get a false passcode verification status", () => {
    const data = [
      {
        mobileNumber: "9745681203",
        passcode: "78965"
      },
      {
        mobileNumber: "9745681003",
        passcode: "12789"
      },
      {
        mobileNumber: "6745681203",
        passcode: "78436"
      },
      {
        mobileNumber: "9745688203",
        passcode: "57897"
      },
      {
        mobileNumber: "8945681203",
        passcode: "12336"
      }
    ]
    data.map(item => expect(verifyPasscode(item.mobileNumber, item.passcode)).to.be.false)
  })

  it("should get a route to login", () => {
    const data = [
      {
        mobileNumber: "9745681203",
        passcode: "78965"
      },
      {
        mobileNumber: "9745681003",
        passcode: "12789"
      },
      {
        mobileNumber: "6745681203",
        passcode: "78436"
      },
      {
        mobileNumber: "9745688203",
        passcode: "57897"
      },
      {
        mobileNumber: "8945681203",
        passcode: "12336"
      }
    ]
    data.map(item => expect(verifyPasscode(item.mobileNumber, item.passcode)).to.be.equal("Login"))
  })
})

describe("user", () => {
  before(() => {
    const users = []
    const manager = new (require("../database/user"))()

    users.map(user => manager.create(user))
  })

  after(() => {
    const manager = new (require("../database/user"))()
    const users = manager.fetchAll()

    users.map(user => manager.delete(user._id))
  })

  it("should be registered", () => {
    const data = [
      { firstName: "", lastName: "", age: 0, mobileNumber: "", pinCode: "", uid: "" }
    ]
    data.map(item => expect(registerUser(item)).to.be.true)
  })

  it("should not be registered", () => {
    const data = [
      { firstName: "", lastName: "", age: 0, mobileNumber: "", pinCode: "", uid: "" }
    ]
    data.map(item => expect(registerUser(item)).to.be.false)
  })
})