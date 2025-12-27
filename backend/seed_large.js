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
    "New York, USA", "San Francisco, USA", "Seattle, USA", "Austin, USA", "Boston, USA", "Chicago, USA", "Los Angeles, USA",
    "Bangalore, India", "Hyderabad, India", "Pune, India", "Mumbai, India", "Delhi, India", "Noida, India", "Gurgaon, India",
    "London, UK", "Manchester, UK", "Birmingham, UK",
    "Toronto, Canada", "Vancouver, Canada", "Montreal, Canada",
    "Berlin, Germany", "Munich, Germany", "Hamburg, Germany",
    "Sydney, Australia", "Melbourne, Australia",
    "Singapore, Singapore",
    "Tokyo, Japan",
    "Dubai, UAE",
    "Remote", "Remote, Worldwide", "Remote, USA", "Remote, India"
];

const jobTitles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Data Scientist",
    "Machine Learning Engineer", "Product Manager", "UI/UX Designer", "QA Automation Engineer", "Mobile App Developer",
    "Cloud Architect", "Cybersecurity Analyst", "System Administrator", "Database Administrator", "Technical Lead",
    "Software Architect", "iOS Developer", "Android Developer", "BlockChain Developer", "Game Developer"
];

const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Freelance"];
const experienceLevels = [0, 1, 2, 3, 4, 5, 8, 10, 12]; // Years

const generateRandomJob = (companies, recruiterId) => {
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    const level = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];

    // Generate salary based on experience roughly (5-50 LPA range logic or random)
    const salary = Math.floor(Math.random() * (60 - 5 + 1) + 5);

    let description = `We are looking for a ${title} to join our team in ${location}. `;
    description += `The ideal candidate should have ${level} years of experience. `;
    description += "You will be working on cutting-edge technologies and solving complex problems. ";
    description += "Key responsibilities include designing, developing, and deploying scalable applications.";

    const requirements = [title.split(" ")[0], "Communication", "Problem Solving"];
    if (title.includes("Frontend")) requirements.push("React", "Next.js", "TailwindCSS");
    if (title.includes("Backend")) requirements.push("Node.js", "Express", "MongoDB", "SQL");
    if (title.includes("Data")) requirements.push("Python", "Pandas", "AWS");
    if (title.includes("DevOps")) requirements.push("Docker", "Kubernetes", "CI/CD");

    return {
        title,
        description,
        requirements: requirements,
        salary: salary * 100000, // Assuming currency unit intent, or just raw number
        experienceLevel: level,
        location,
        jobType,
        position: Math.floor(Math.random() * 10) + 1,
        company: company._id,
        created_by: recruiterId
    };
};

const seedLargeData = async () => {
    await connectDB();

    console.log("Fetching Recruiter and Companies...");
    // Find the recruiter we created in the previous seed
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

    console.log("Generating 150 Jobs...");
    const jobsToInsert = [];
    for (let i = 0; i < 150; i++) {
        jobsToInsert.push(generateRandomJob(companies, recruiter._id));
    }

    await Job.insertMany(jobsToInsert);
    console.log("Successfully added 150+ jobs!");
    process.exit(0);
}

seedLargeData();
