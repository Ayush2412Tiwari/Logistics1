const {test,expect}=require('@playwright/test')

test('Test 1',async({page})=>{

    await page.goto("http://localhost:5173/")

    await page.waitForTimeout(3000)
})