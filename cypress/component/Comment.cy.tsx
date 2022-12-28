import Comment from "@/components/comment/Comment";
import { faker } from "@faker-js/faker";

const comment = {
  id: faker.datatype.uuid(),
  postId: faker.datatype.uuid(),
  parentCommentId: faker.datatype.uuid(),
  content: faker.company.catchPhrase(),
  user: {
    id: faker.datatype.uuid(),
    profile: {
      name: faker.name.fullName(),
      image: faker.image.image(),
    },
  },
};

describe("Comment.cy.ts", () => {
  it("playground", () => {
    cy.mount(<Comment comment={comment} />);
  });
});
