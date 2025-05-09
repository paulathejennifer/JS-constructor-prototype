//Question 1
//pseudocode



function FeatureToggle(featureName, isEnabled, userGroupAccess){
    this.featureName=featureName;
    this.isEnabled=isEnabled;
    this.userGroupAccess = userGroupAccess;
   
}

FeatureToggle.prototype.canAccess = function(userRole){
    if (this.isEnabled && this.userGroupAccess.includes(userRole)){
        return true
    }
 

    return false
}

FeatureToggle.prototype.toggleFeature=function(flag){
    this.isEnabled=flag
}
function simulateAccess(featureToggle, userRole){
    if(featureToggle.canAccess(userRole)){
        console.log(`Access granted for ${userRole} `);
        
    }
    else{
        console.log(`Access denied for ${userRole} `);
    }

switch(featureToggle.canAccess(userRole)){
    case true:
        console.log(`Role switch granted `);
        case false:
        console.log(`Role switch denied `);
        default:
            console.log(`Role switch invalid!`);
            
        
}
}


const user1 = new FeatureToggle("Light mode", false, ["admin", "data analyst"])

console.log("Before enabling feature");
simulateAccess(user1, "admin")
simulateAccess(user1, "beta tester")
simulateAccess(user1, "data analyst")

console.log("After enabling feature");

user1.toggleFeature(true)

simulateAccess(user1, "admin")
simulateAccess(user1, "beta tester")
simulateAccess(user1, "data analyst")


const name = "Jennifer"
console.log(name);

//Question 2
//pseudocode

function TimeLog(freeLancerName, projectDetails){
    this.freeLancerName= freeLancerName;
    this.projectDetails = projectDetails;
    this.logs = []
}

TimeLog.prototype.addLog= function(date, hoursWorked){
    this.logs.push({date, hoursWorked});
};

TimeLog.prototype.calculateTotalEarnings = function(){
    const hourlyRate=this.projectDetails.hourlyRate;
    let totalHour=0
    this.logs.forEach(log =>{
        totalHour += log.hoursWorked
    })
    return totalHour * hourlyRate
};

TimeLog.prototype.filterLogsByTheirRange = function(startingDate ,endingDate){
    const start = new Date(startingDate);
    const end = new Date(endingDate);

    return this.logs.filter(log =>{
        const logDate = new Date(log.date)
        return logDate >= start && logDate <= end
    });
};

TimeLog.prototype.weeklyHoursThatExceeded= function(){
    const weeklyHours = {}



    this.logs.forEach(log =>{
        const logDate = new Date(log.date)
        const weekNo = getWeekNumber(logDate)

        if(!weeklyHours[weekNo]){
            weeklyHours[weekNo]=0;
        }
        weeklyHours[weekNo]+= log.hoursWorked;
        
    })

    for (const week in weeklyHours){
        if(weeklyHours[week] > 40)
            return true
    }
    return false
}

function getWeekNumber(date){
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDayOfYear = (date - firstDayOfYear)/86400000
    return Math.ceil((pastDayOfYear * firstDayOfYear.getDay() + 1)/ 7
)
}

const project = {name:"We development", hourlyRate:50}
const timelog = new TimeLog("Jeniifer Chinyere", project)

timelog.addLog("2025-05-03", 7)
timelog.addLog("2025-05-04", 4)
timelog.addLog("2025-05-05", 10)
timelog.addLog("2025-05-06", 7)
timelog.addLog("2025-05-07", 17)

console.log("Total Earnings:", timelog.calculateTotalEarnings());
const filteredLogs = timelog.filterLogsByTheirRange("2025-05-03", "2025-05-07")
console.log("Filtered Logs:",filteredLogs);

const exceeds40 = timelog.weeklyHoursThatExceeded();
console.log("Weekly hours exceeded by 40:", exceeds40);

//Question 3
//pseudocode
function Order(customer, items, status){
    this.customer = customer;
    this.items = items;
    this.status = status;
}

Order.prototype.totalCost = function(){
let totalCost = 0;

this.items.forEach(item => {
    totalCost+= item.quantity * item.unitPrice;
})
return totalCost;
}

Order.prototype.updateStatus=function(isPaid){
    if(isPaid){
        this.status = "Payment is paid";

    }
    else{
        this.status= "Payment is pending"
    }
    return this.status;
}

Order.prototype.categorizeByUrgency= function(){
    let urgency;


switch(this.status){
    case "Payment is pending":
        urgency = "Low";
        break

        case "Payment is paid":
            urgency = "High";
            break

            case "Payment is shipped":
                urgency = "Medium";
                break

                default:
                    urgency="Unknown"
}
return urgency;
}

const myCustomer = {name: "Alice Kamau", email:"alikamau@gmail.com"}

const itemsBought =[
    {productName:"Laptop", quantity:1, unitPrice:20000},
    {productName:"Suitcase", quantity:1, unitPrice:1000},
    {productName:"Table", quantity:2, unitPrice:1500}
]

const order= new Order(myCustomer, itemsBought, "Payment is pending") 
console.log("Total cost:", order.totalCost());
console.log("Order Status:", order.updateStatus(true));


//Question 4
function Employee(id, name, performanceMetrics, feedback){
    this.id = id;
    this.name = name;
    this.performanceMetrics=performanceMetrics;
    this.feedback = feedback;
}

Employee.prototype.calcculateAverageMarks = function(){
    const metrics = Object.values(this.performanceMetrics);
    const totalScores = metrics.reduce((sum, marks)=> sum + marks, 0)
    return metrics.length ? (totalScores / metrics.length).toFixed(2):0
};

Employee.prototype.classifyPerformanceLevel = function(){
    const averageScore = this.calcculateAverageMarks();
    let performanceLevel;

    if(averageScore >= 4.5){
        performanceLevel = "Great Job"
    }
    else if(averageScore >= 3.5){
        performanceLevel = ""
    }
    else if(averageScore >= 2.5){
        performanceLevel = "Almost there"
    }
    else {
        performanceLevel = "You can do better"
    }
    return performanceLevel
}

Employee.prototype.addFeedback = function(newFeedback){
    if(newFeedback && !this.feedback.includes(newFeedback)){
        this.feedback.push(newFeedback);
        return "Feedback added successfully!"
    }
    return "Feedback is either empty or exists!"
};

const employee = new Employee(
    101, "Jennifer Matete", {communication:4.7, efficiency: 4.2 ,reliability: 4.9},
    ["Great team player", "Effectively meets deadlines"]
);

console.log("Average score:", employee.calcculateAverageMarks());
console.log("Performance level:", employee.classifyPerformanceLevel());
console.log(employee.addFeedback("Excellent leadership so far"));
console.log(employee.addFeedback("Great communicator!"));
console.log("Updated feedback:", employee.feedback);


//Question 5
//pseudocode
function Course(title, instructor, students){
    this.title = title;
    this.instructor = instructor;
    this.students = students || [];

}

Course.prototype.getCompletedStudents = function(){
    return this.students.filter(student => student.completionStatus===true)
    .map(student=> student.name);

}

Course.prototype.countStudentsByExpertise = function(expertiseArea){
this.students.filter(student => student.expertiseArea).length;
};

Course.prototype.instructorMessage = function(){
    const studentCount = this.students.length;

    if(studentCount > 5){
        console.log(`Instructor ${this.instructor.name}, congrats for having more than 5 students (${studentCount}) enrolled in the  "${this.title}" course.`);
        
    };
    if (studentCount > 0){
        console.log(`Instructor ${this.instructor.name}, you have (${studentCount}) enrolled in the  "${this.title}" course.Keep up`);
        
    }
    else{
        console.log(`Instructor ${this.instructor.name}, there are no students enrolled in the "${this.title}" course yet`); 
    }
}


const instructor = {name: "John Maina", expertise: "Navigating Your Journey"}
const students = [
    {name: "Janet", completionStatus:true, expertise:"Web development"},
    {name: "Kisanet", completionStatus:false, expertise:"Web development"},
    {name: "Peter", completionStatus:false, expertise:"Mobile development"},
    {name: "Owuor", completionStatus:true, expertise:"Navigating your journey"},
    {name: "Frank", completionStatus:true, expertise:"Machine learning"},
    {name: "Pauline", completionStatus:false, expertise:"Quality Assurance"}

]

const course = new Course("Introduction to Machine learning" ,instructor, students)
console.log("Completed students:" ,course.getCompletedStudents());

console.log("Web development students:",course.countStudentsByExpertise("Web development"));
course.instructorMessage()





