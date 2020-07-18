from abc import abstractmethod, ABC


class Article:
    def __init__(self, authorName, title, description):
        self.__authorName = authorName
        self.__title = title
        self.__description = description

    def __repr__(self):
        return "Author Name:% s\n    Title:% s\n    Description:% s\n" % (
            self.__authorName, self.__title, self.__description)

    def getAuthorName(self):
        return self.__authorName

    def getTitle(self):
        return self.__title

    def getDescription(self):
        return self.__description

    def setAuthorName(self, authorName):
        self.__authorName = authorName

    def setTitle(self, title):
        self.__title = title

    def setDescription(self, description):
        self.__description = description


class ListingStrategy(ABC):
    @abstractmethod
    def listArticles(self, listOfArticles):
        pass


class listInTerminal(ListingStrategy):

    def listArticles(self, listOfArticles):
        index = 0
        for article in listOfArticles:
            print(index + 1, ")", article)
            index += 1
        if index == 0:
            print("No Article Found")


class listInFile(ListingStrategy):

    def listArticles(self, listOfArticles):
        f = open("articles.txt", "w")
        index = 0
        for article in listOfArticles:
            articleString = article.getAuthorName() + "\n" + article.getTitle() + "\n" + article.getDescription() + "\n\n"
            f.write(articleString)
            index += 1
        f.close()


class UpdateStrategy(ABC):
    @abstractmethod
    def updateArticle(self, updateArgument, article):
        pass


class UpdateAuthorName(UpdateStrategy):
    def updateArticle(self, updateAuthorName, article):
        article.setAuthorName(updateAuthorName)
        return article


class UpdateTitle(UpdateStrategy):
    def updateArticle(self, updateTitle, article):
        article.setTitle(updateTitle)
        return article


class UpdateDescitption(UpdateStrategy):
    def updateArticle(self, updateDescription, article):
        article.setTitle(updateDescription)
        return article


class Context:
    def __init__(self, listStrategy: ListingStrategy):
        self._listStrategy = listStrategy

    def __init__(self, updateStrategy: UpdateStrategy):
        self._updateStrategy = updateStrategy

    def setListStrategy(self, listStrategy):
        self._listStrategy = listStrategy

    def listArticles(self, listOfArticles):
        self._listStrategy.listArticles(listOfArticles)

    def setUpdateStrategy(self, updateStrategy):
        self._updateStrategy = updateStrategy

    def updateArticle(self, updatedArgument, article):
        return self._updateStrategy.updateArticle(updatedArgument, article)


class ManageArticles:
    context = Context(listInTerminal())

    def createArticle(self, authorName, title, description):
        return Article(authorName, title, description)

    def deleteAnArticle(self, indexOfArticle, listOfArticles):
        if indexOfArticle > len(listOfArticles) or indexOfArticle < 1:
            return False
        del listOfArticles[indexOfArticle - 1]
        return True

    def updateAnArticle(self, updateOption,indexOfArticle, listOfArticles):
        article = listOfArticles[indexOfArticle-1]
        if (updateOption == "1"):
            updatedAuthorName = input("Please enter the new author name")
            self.context._updateStrategy = UpdateAuthorName()
            updatedArticle = self.context.updateArticle(updatedAuthorName, article)

        elif (updateOption == "2"):
            updatedTitle = input("Please enter the new title")
            self.context._updateStrategy = UpdateTitle()
            updatedArticle = self.context.updateArticle(updatedTitle, article)

        elif (updateOption == "3"):
            updatedDescription = input("Please enter the new description")
            self.context._updateStrategy = UpdateDescitption()
            updatedArticle = self.context.updateArticle(updatedDescription, article)
            
        self.deleteAnArticle(indexOfArticle, listOfArticles)
        listOfArticles.insert(indexOfArticle, updatedArticle)

    def saveArticlesToFile(self, listOfArticles):
        self.context._listStrategy = listInFile()
        self.context.listArticles(listOfArticles)

    def readArticlesFromFile(self):
        f = open("articles.txt", "r")
        listOfArticles = []

        for line in f:
            authorName = line
            title = f.readline()
            description = f.readline()
            f.readline()  # read \n

            article = Article(authorName.rstrip("\n"), title.rstrip("\n"), description.rstrip("\n"))
            listOfArticles.append(article)

        f.close()
        return listOfArticles

    def showOptionsList(self, listOfArticles):
        self.readArticlesFromFile()

        while True:
            print("For Creating an article please enter 1\n"
                  "For listing the articles please enter 2\n"
                  "For Deleting an article please enter 3\n"
                  "For Updating an article please enter 4\n"
                  "For Exiting enter exit")
            optionNumber = input()
            if optionNumber == "exit":
                self.saveArticlesToFile(listOfArticles)
                break

            elif optionNumber == "1":
                authorName = input("Enter Author Name:")
                title = input("Enter Title:")
                description = input("Enter Description:")
                article = self.createArticle(authorName, title, description)
                listOfArticles.append(article)

            elif optionNumber == "2":
                self.context._listStrategy = listInTerminal()
                self.context.listArticles(listOfArticles)

            elif optionNumber == "3":
                self.context._listStrategy = listInTerminal()
                self.context.listArticles(listOfArticles)
                indexOfArticle = int(input("Enter the number of the article you want to delete"))
                isDeleted = self.deleteAnArticle(indexOfArticle, listOfArticles)
                if isDeleted is False:
                    print("Article ", indexOfArticle, " doesn't exist")

            elif optionNumber == "4":
                self.context._listStrategy = listInTerminal()
                self.context.listArticles(listOfArticles)

                indexOfArticle = int(input("Enter the number of the article you want to update"))

                print("For Updating the author name please enter 1\n"
                      "For Updating the title please enter 2\n"
                      "For Updating the description please enter 3\n")
                updateOption = input()
                while updateOption is not "1" and updateOption is not "2" and updateOption is not "3":
                    updateOption = input("please enter 1,2 or 3 only")

                self.updateAnArticle(updateOption,indexOfArticle,listOfArticles)


def main():
    manageArticle = ManageArticles()
    listOfArticles = manageArticle.readArticlesFromFile()
    manageArticle.showOptionsList(listOfArticles)


if __name__ == "__main__":
    main()
