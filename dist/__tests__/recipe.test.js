"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
let token;
let recipeId;
const loginUser = {
    email: "abey@gmail.com",
    password: "Secret@123"
};
const regUser = {
    fullName: "Abey stepehen",
    email: "abey@gmail.com",
    password: "Secret@123"
};
describe("POST /signup", () => {
    it("return status code 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/user/signup")
            .send(regUser);
        expect(res.statusCode).toEqual(200);
    }));
    test("login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/user/login")
            .send(loginUser);
        token = response.body.accessToken;
        expect(response.status).toBe(200);
    }));
});
describe("recipe", () => {
    let recipeData = {
        title: "Ororo Gari",
        meal_type: "Breakfast",
        difficulty_level: "Beginner",
        ingredients: [
            {
                name: "Onions",
                price: "2000"
            },
            {
                name: "Pepper",
                price: "2000"
            },
            {
                name: "Yam",
                price: "2000"
            }
        ],
        preparation: "Mix together"
    };
    test("create recipe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/recipes")
            .set("Authorization", `Bearer ${token}`)
            .send(recipeData);
        recipeId = response.body._id;
        expect(response.status).toBe(200);
    }));
    test("get all recipes", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/recipes")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    test("get a recipe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/recipes/${recipeId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    test("update an recipe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/recipes/${recipeId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(recipeData);
        expect(response.status).toBe(200);
    }));
    test("delete an recipe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/recipes/${recipeId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
