import dotenv from "dotenv";
import mongoose from "mongoose";
import LanguageModel from "./models/language.model.js";
import TagModel from "./models/tag.model.js";
import SnippetModel from "./models/snippet.model.js";

async function seedData() {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");

    // ----------------------
    // CLEAR EXISTING DATA
    // ----------------------
    await LanguageModel.deleteMany({});
    await TagModel.deleteMany({});
    await SnippetModel.deleteMany({});

    // ----------------------
    // CREATE LANGUAGES
    // ----------------------
    const languages = await LanguageModel.insertMany([
      { name: "javascript" },
      { name: "python" },
      { name: "typescript" },
      { name: "c" },
      { name: "golang" },
    ]);

    const langMap = {};
    languages.forEach((l) => (langMap[l.name] = l._id));

    // ----------------------
    // CREATE TAGS
    // ----------------------
    const tags = await TagModel.insertMany([
      { name: "array" },
      { name: "loop" },
      { name: "function" },
      { name: "async" },
      { name: "dom" },
    ]);

    const tagMap = {};
    tags.forEach((t) => (tagMap[t.name] = t._id));

    // ----------------------
    // CREATE SNIPPETS
    // ----------------------
    await SnippetModel.insertMany([
      {
        title: "For loop in JS",
        code: "for (let i=0;i<10;i++) {\n\tconsole.log(i);\n}",
        description: "Basic for loop in JavaScript",
        langId: langMap["javascript"],
        tagIds: [tagMap["array"], tagMap["loop"]],
      },
      {
        title: "Async function in JS",
        code: "async function fetchData(){\n\tconst res = await fetch(url);\n }",
        description: "Example of async function",
        langId: langMap["javascript"],
        tagIds: [tagMap["async"], tagMap["function"]],
      },
      {
        title: "List comprehension in Python",
        code: "[x*2 for x in range(10)]",
        description: "Double each number using list comprehension",
        langId: langMap["python"],
        tagIds: [tagMap["array"], tagMap["loop"]],
      },
      {
        title: "Map over array",
        code: "[1,2,3].map(x => x * 2);",
        description: "Double each number in an array",
        langId: langMap["javascript"],
        tagIds: [tagMap["array"], tagMap["function"]],
      },
      {
        title: "Filter array",
        code: "[1,2,3,4].filter(x => x % 2 === 0);",
        description: "Get even numbers",
        langId: langMap["javascript"],
        tagIds: [tagMap["array"]],
      },
      {
        title: "DOM query selector",
        code: "const el = document.querySelector('#id');",
        description: "Basic DOM selection",
        langId: langMap["javascript"],
        tagIds: [tagMap["dom"]],
      },
      {
        title: "Promise example",
        code: "new Promise(resolve => resolve(42));",
        description: "Simple promise",
        langId: langMap["javascript"],
        tagIds: [tagMap["async"]],
      },
      {
        title: "Arrow function",
        code: "const add = (a,b) => a + b;",
        description: "Simple arrow function",
        langId: langMap["javascript"],
        tagIds: [tagMap["function"]],
      },
      {
        title: "Lambda function",
        code: "add = lambda a, b: a + b",
        description: "Lambda expression",
        langId: langMap["python"],
        tagIds: [tagMap["function"]],
      },
      {
        title: "Range loop",
        code: "for i in range(5):\n\tprint(i)",
        description: "Python loop example",
        langId: langMap["python"],
        tagIds: [tagMap["loop"]],
      },
      {
        title: "Dictionary comprehension",
        code: "{x: x*x for x in range(5)}",
        description: "Square numbers into a dict",
        langId: langMap["python"],
        tagIds: [tagMap["array"]],
      },
      {
        title: "Async await Python",
        code: "async def fetch():\n\tawait asyncio.sleep(1)",
        description: "Basic async example",
        langId: langMap["python"],
        tagIds: [tagMap["async"]],
      },
      {
        title: "Define a function",
        code: 'def greet(name):\n\treturn f"Hello {name}"',
        description: "Simple function in Python",
        langId: langMap["python"],
        tagIds: [tagMap["function"]],
      },
      {
        title: "TS interface",
        code: "interface User {\n\tname: string;\n\tage: number;\n}",
        description: "Basic TypeScript interface",
        langId: langMap["typescript"],
        tagIds: [tagMap["function"]],
      },
      {
        title: "TS typed function",
        code: "function add(a: number, b: number): number {\n\treturn a + b;\n}",
        description: "Typed function example",
        langId: langMap["typescript"],
        tagIds: [tagMap["function"]],
      },
      {
        title: "TS generics",
        code: "function wrap<T>(value: T): T[] {\n\treturn [value];\n}",
        description: "Generic function example",
        langId: langMap["typescript"],
        tagIds: [tagMap["function"], tagMap["array"]],
      },
      {
        title: "C for loop",
        code: 'for (int i = 0; i < 10; i++) {\n\tprintf("%d\\n", i);\n}',
        description: "Basic loop in C",
        langId: langMap["c"],
        tagIds: [tagMap["loop"]],
      },
      {
        title: "C function",
        code: "int add(int a, int b) {\n\treturn a + b;\n}",
        description: "Simple function example",
        langId: langMap["c"],
        tagIds: [tagMap["function"]],
      },
      {
        title: "C array",
        code: "int arr[3] = {1,2,3};",
        description: "Simple int array",
        langId: langMap["c"],
        tagIds: [tagMap["array"]],
      },
      {
        title: "Go loop",
        code: "for i := 0; i < 5; i++ {\n\tfmt.Println(i)\n}",
        description: "Basic for loop in Go",
        langId: langMap["golang"],
        tagIds: [tagMap["loop"]],
      },
      {
        title: "Go function",
        code: "func add(a int, b int) int {\n\treturn a + b\n}",
        description: "Simple function in Go",
        langId: langMap["golang"],
        tagIds: [tagMap["function"]],
      },
      {
        title: "Go slice",
        code: "nums := []int{1,2,3}",
        description: "Create a slice in Go",
        langId: langMap["golang"],
        tagIds: [tagMap["array"]],
      },
      {
        title: "Go goroutine",
        code: 'go func() {\n\tfmt.Println("hello")\n}()',
        description: "Simple goroutine",
        langId: langMap["golang"],
        tagIds: [tagMap["async"]],
      },
    ]);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedData();
