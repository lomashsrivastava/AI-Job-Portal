import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}

const locations = [
    "New York, USA", "San Francisco, USA", "Seattle, USA", "Austin, USA", "Boston, USA", "Chicago, USA", "Los Angeles, USA", "Miami, USA", "Denver, USA",
    "Bangalore, India", "Hyderabad, India", "Pune, India", "Mumbai, India", "Delhi, India", "Noida, India", "Gurgaon, India", "Chennai, India", "Kolkata, India",
    "London, UK", "Manchester, UK", "Birmingham, UK", "Edinburgh, UK", "Bristol, UK",
    "Toronto, Canada", "Vancouver, Canada", "Montreal, Canada", "Ottawa, Canada",
    "Berlin, Germany", "Munich, Germany", "Hamburg, Germany", "Frankfurt, Germany",
    "Sydney, Australia", "Melbourne, Australia", "Brisbane, Australia", "Perth, Australia",
    "Singapore, Singapore",
    "Tokyo, Japan", "Osaka, Japan", "Kyoto, Japan",
    "Dubai, UAE", "Abu Dhabi, UAE",
    "Paris, France", "Lyon, France",
    "Amsterdam, Netherlands", "Rotterdam, Netherlands",
    "Zurich, Switzerland", "Geneva, Switzerland",
    "Stockholm, Sweden",
    "Seoul, South Korea",
    "Remote", "Remote, Worldwide", "Remote, USA", "Remote, India", "Remote, Europe", "Remote, APAC"
];

const jobTitles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Data Scientist",
    "Machine Learning Engineer", "Product Manager", "UI/UX Designer", "QA Automation Engineer", "Mobile App Developer",
    "Cloud Architect", "Cybersecurity Analyst", "System Administrator", "Database Administrator", "Technical Lead",
    "Software Architect", "iOS Developer", "Android Developer", "BlockChain Developer", "Game Developer",
    "AI Research Scientist", "Site Reliability Engineer", "Data Engineer", "Network Engineer", "IT Support Specialist",
    "Scrum Master", "Agile Coach", "Product Owner", "Business Analyst", "Marketing Manager", "Sales Engineer",
    "Solutions Architect", "Technical Writer", "Embedded Systems Engineer", "Robotics Engineer"
];

const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Freelance", "Temporary"];
const experienceLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15]; // Years

const generateRandomJob = (companies, recruiterId) => {
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    const level = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];

    // Generate salary based on experience roughly (5-150 LPA range logic or random)
    const salary = Math.floor(Math.random() * (120 - 5 + 1) + 5);

    let description = `We are looking for a highly skilled ${title} to join our dynamic team in ${location}. `;
    description += `The ideal candidate should have ${level}+ years of hands-on experience in relevant technologies. `;
    description += "You will be working on cutting-edge projects, optimizing performance, and scaling our products to millions of users. ";
    description += "Strong problem-solving skills and a passion for technology are a must. ";
    description += "Responsibilities include: designing architecture, code reviews, writing clean and testable code, and mentoring junior developers.";

    const requirements = ["Communication", "Problem Solving", "Team Player"];
    if (title.includes("Frontend")) requirements.push("React.js", "Next.js", "TypeScript", "TailwindCSS", "Redux");
    else if (title.includes("Backend")) requirements.push("Node.js", "Express.js", "MongoDB", "PostgreSQL", "Redis", "Docker");
    else if (title.includes("Full Stack")) requirements.push("MERN Stack", "AWS", "CI/CD", "System Design");
    else if (title.includes("Data")) requirements.push("Python", "Pandas", "NumPy", "SQL", "Spark", "TensorFlow");
    else if (title.includes("DevOps")) requirements.push("Docker", "Kubernetes", "Jenkins", "Terraform", "AWS/Azure");
    else if (title.includes("Mobile")) requirements.push("React Native", "Flutter", "Swift", "Kotlin");
    else requirements.push("Java", "C++", "Go", "Rust");

    return {
        title,
        description,
        requirements: requirements,
        salary: salary * 100000,
        experienceLevel: level,
        location,
        jobType,
        position: Math.floor(Math.random() * 20) + 1,
        company: company._id,
        created_by: recruiterId
    };
};

const seedMassiveData = async () => {
    await connectDB();

    console.log("Fetching Recruiter and Companies...");
    // Find the recruiter
    const recruiter = await User.findOne({ email: "recruiter@test.com" });
    if (!recruiter) {
        console.log("Recruiter not found! Please run the initial seed.js first.");
        process.exit(1);
    }

    const companies = await Company.find({ userId: recruiter._id });
    if (companies.length === 0) {
        console.log("No companies found! Please run the initial seed.js first.");
        process.exit(1);
    }

    console.log(`Found Recruiter: ${recruiter.fullname}`);
    console.log(`Found ${companies.length} Companies.`);

    const BATCH_SIZE = 1000;
    const TOTAL_JOBS = 10000;

    console.log(`Starting generation of ${TOTAL_JOBS} jobs in batches of ${BATCH_SIZE}...`);

    for (let i = 0; i < TOTAL_JOBS; i += BATCH_SIZE) {
        const jobsBatch = [];
        for (let j = 0; j < BATCH_SIZE; j++) {
            if (i + j < TOTAL_JOBS) {
                jobsBatch.push(generateRandomJob(companies, recruiter._id));
            }
        }
        await Job.insertMany(jobsBatch);
        console.log(`Inserted batch ${i / BATCH_SIZE + 1} (${jobsBatch.length} jobs)`);
    }

    console.log(`Successfully added ${TOTAL_JOBS} jobs!`);
    process.exit(0);
}

seedMassiveData();
