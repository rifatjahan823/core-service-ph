import { z } from "zod";

 const create=z.object({
    body:z.object({
        year:z.number({
            required_error:"year is require"
        }),
        title:z.string({
            required_error:"title is require"
        }),
        code:z.string({
            required_error:"code is require"
        }),
        startMonth:z.string({
            required_error:"startMonth is require"
        }),
        endMonth:z.string({
            required_error:"endMonth is require"
        })
    })
})

export const academicSemesterValidation={create}