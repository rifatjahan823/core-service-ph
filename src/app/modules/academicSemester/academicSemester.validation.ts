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

const update = z.object({
    body: z.object({
        title: z.string().optional(),
        code: z.string().optional(),
        year: z.number().optional(),
        startMonth: z.string().optional(),
        endMonth: z.string().optional()
    })
});



export const academicSemesterValidation={create,update}