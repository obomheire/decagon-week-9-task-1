import supertest from 'supertest'
import app from '../app'

let token: string;
let recipeId: string;

const loginUser ={
  email: "abey@gmail.com",
  password: "Secret@123"
}

const regUser ={   
    fullName: "Abey stepehen",
    email: "abey@gmail.com",
    password: "Secret@123"
}

  describe("POST /signup",()=>{

      it("return status code 201",async()=>{
          const res = await supertest(app)
          .post("/user/signup")
          .send(regUser)
          expect(res.statusCode).toEqual(200)
      })

      test("login", async () => {
        const response = await supertest(app)
          .post("/user/login")
          .send(loginUser);
        token = response.body.accessToken;
        expect(response.status).toBe(200);
    });
})

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
                name : "Pepper",
                price: "2000"
            },
            {
                name: "Yam",
                price: "2000"
            }
        ],
        preparation: "Mix together"
    }

    
    test("create recipe", async () => {

      const response = await supertest(app)
        .post("/recipes")
        .set("Authorization", `Bearer ${token}`)
        .send(recipeData);
      recipeId = response.body._id;
      expect(response.status).toBe(200);
    });
 
    test("get all recipes", async () => { 

        const response = await supertest(app)
          .get("/recipes")
          .set("Authorization", `Bearer ${token}`); 
        expect(response.status).toBe(200);
    });

    test("get a recipe", async () => {

        const response = await supertest(app)
          .get(`/recipes/${recipeId}`)
          .set("Authorization", `Bearer ${token}`); 
        expect(response.status).toBe(200);
    });

    test("update an recipe", async () => {
      const response = await supertest(app)
        .put(`/recipes/${recipeId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(recipeData);
      expect(response.status).toBe(200);

    });

    test("delete an recipe", async () => {

      const response = await supertest(app)
        .delete(`/recipes/${recipeId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
  
  });

}
)
