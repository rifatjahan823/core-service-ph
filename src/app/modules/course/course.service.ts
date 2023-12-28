import { Course, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { courseSearchableFields } from "./course.constants";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { ICourseCreateData, ICourseFilterRequest, IPrerequisiteCourseRequest } from "./corse.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { asyncForEach } from "../../../shared/utils";

const insertIntoDB = async (data:ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async (transactionClient) => {
      const result = await transactionClient.course.create({
          data: courseData
      })
      if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
    }

      if (preRequisiteCourses && preRequisiteCourses.length > 0) {
       await asyncForEach(preRequisiteCourses,async (preRequisiteCourse:IPrerequisiteCourseRequest) => {
        const createPrerequisite = await transactionClient.courseToPrerequiset.create({
          data: {
              couseId: result.id,
              prerequisetId: preRequisiteCourse.courseId
           
          }
      });
      console.log(createPrerequisite )
       })
      }
      return result;
  })

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
        where: {
            id: newCourse.id
        },
        include: {
           prerequiset: {
                include: {
                    prerequiset: true
                }
            },
           prerequisetFor: {
                include: {
                    course: true
                }
            }
        }
    })

    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
  };

// ***********GetAll***************
  const getAllFromDB = async (
    filters: ICourseFilterRequest,
    options: IPaginationOptions
  ): Promise<IGenericResponse<Course[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
  
    const andConditions = [];
  
    if (searchTerm) {
      andConditions.push({
        OR: courseSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
  
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => ({
          [key]: {
            equals: (filterData as any)[key],
          },
        })),
      });
    }
  
    const whereConditions: Prisma.CourseWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
  
    const result = await prisma.course.findMany({
      include: {
        prerequiset: {
            include: {
                prerequiset: true
            }
        },
        prerequisetFor: {
            include: {
                course: true
            }
        }
    },
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
    });
  
    const total = await prisma.course.count();
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  };
// **********Single***********
  const getByIdFromDB = async (id: string): Promise<Course | null> => {
    const result = await prisma.course.findUnique({
        where: {
            id
        },
        include: {
            prerequiset: {
                include: {
                    prerequiset: true
                }
            },
            prerequisetFor: {
                include: {
                    course: true
                }
            }
        }
    });
    return result;
};

// ********Update*************

const updateOneInDB=async (id:string,payload:Partial<ICourseCreateData>):Promise<Course|null> => {
  const { preRequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async (transactionClient) => {
    const result=await transactionClient.course.update({
      where:{
        id
      },
      data:courseData
    })
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Unable to update course")
  }
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletePrerequisite = preRequisiteCourses.filter(
                (coursePrerequisite) => coursePrerequisite.courseId&& coursePrerequisite.isDeleted
            )
      const newPrerequisite = preRequisiteCourses.filter(
        (coursePrerequisite) => coursePrerequisite.courseId && !coursePrerequisite.isDeleted
          )
          await asyncForEach(
            deletePrerequisite,
            async (deletePreCourse: IPrerequisiteCourseRequest) => {
                await transactionClient.courseToPrerequiset.deleteMany({
                    where: {
                        AND: [
                            {
                                couseId: id
                            },
                            {
                                prerequisetId: deletePreCourse.courseId
                            }
                        ]
                    }
                })
            }
        )
        await asyncForEach(
          newPrerequisite,
          async (insertPrerequisite: IPrerequisiteCourseRequest) => {
              await transactionClient.courseToPrerequiset.create({
                  data: {
                      couseId: id,
                      prerequisetId: insertPrerequisite.courseId
                  }
              })
          }
      )
      };
      return result;
  });
  const responseData = await prisma.course.findUnique({
    where: {
        id
    },
    include: {
       prerequiset: {
            include: {
                prerequiset: true
            }
        },
       prerequisetFor: {
            include: {
                course: true
            }
        }
    }
})

return responseData

}



// *************Delete************
const deleteByIdFromDB = async (id: string): Promise<Course> => {
  await prisma.courseToPrerequiset.deleteMany({
      where: {
          OR: [
              {
                  couseId: id
              },
              {
                  prerequisetId: id
              }
          ]
      }
  });

  const result = await prisma.course.delete({
      where: {
          id
      }
  });
  return result;
};

  export const CourseService={
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB, 
    deleteByIdFromDB
  }
  