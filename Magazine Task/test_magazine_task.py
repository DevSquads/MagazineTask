import unittest
from unittest import mock

import MagazineTask

class TestCreateArticle(unittest.TestCase):
    def test_createArticle_equal(self):
        article = MagazineTask.Article("author1","title1","description1")
        resultArticle = MagazineTask.ArticlesManager.createArticle(self,"author1","title1","description1")
        self.assertEqual(vars(article),vars(resultArticle))

    def test_createArticle_notEqual(self):
        article = MagazineTask.Article("author1","title1","description1")
        resultArticle = MagazineTask.ArticlesManager.createArticle(self,"author2","title2","description2")
        self.assertNotEqual(vars(article),vars(resultArticle))

class TestDeleteAnArticle(unittest.TestCase):
    def test_deleteAnArticle_article_Exist(self):
        listOfArticles = [MagazineTask.Article("author1", "title1", "description1"),
                          MagazineTask.Article("author2", "title2", "description2"),
                          MagazineTask.Article("author3", "title3", "description3")]

        isDeleted = MagazineTask.ArticlesManager.deleteAnArticle(self, 1,listOfArticles)
        self.assertEqual(isDeleted,True)

    def test_deleteAnArticle_article_not_exist_positive_index(self):
        listOfArticles = [MagazineTask.Article("author1", "title1", "description1"),
                          MagazineTask.Article("author2", "title2", "description2"),
                          MagazineTask.Article("author3", "title3", "description3")]

        isDeleted = MagazineTask.ArticlesManager.deleteAnArticle(self, 10,listOfArticles)
        self.assertEqual(isDeleted,False)

    def test_deleteAnArticle_article_test_boundary_negative_index(self):
        listOfArticles = [MagazineTask.Article("author1", "title1", "description1"),
                          MagazineTask.Article("author2", "title2", "description2"),
                          MagazineTask.Article("author3", "title3", "description3")]

        isDeleted = MagazineTask.ArticlesManager.deleteAnArticle(self, -1,listOfArticles)
        self.assertEqual(isDeleted,False)

    def test_deleteAnArticle_article_test_boundary_index0(self):
        listOfArticles = [MagazineTask.Article("author1", "title1", "description1"),
                          MagazineTask.Article("author2", "title2", "description2"),
                          MagazineTask.Article("author3", "title3", "description3")]

        isDeleted = MagazineTask.ArticlesManager.deleteAnArticle(self, 0,listOfArticles)
        self.assertEqual(isDeleted,True)

    def test_deleteAnArticle_article_test_boundary_index1(self):
        listOfArticles = [MagazineTask.Article("author1", "title1", "description1"),
                          MagazineTask.Article("author2", "title2", "description2"),
                          MagazineTask.Article("author3", "title3", "description3")]

        isDeleted = MagazineTask.ArticlesManager.deleteAnArticle(self, 1,listOfArticles)
        self.assertEqual(isDeleted,True)

    def test_deleteAnArticle_article_test_boundary_index2(self):
        listOfArticles = [MagazineTask.Article("author1", "title1", "description1"),
                          MagazineTask.Article("author2", "title2", "description2"),
                          MagazineTask.Article("author3", "title3", "description3")]

        isDeleted = MagazineTask.ArticlesManager.deleteAnArticle(self, 2,listOfArticles)
        self.assertEqual(isDeleted,True)

    def test_deleteAnArticle_article_test_boundary_index3(self):
        listOfArticles = [MagazineTask.Article("author1", "title1", "description1"),
                          MagazineTask.Article("author2", "title2", "description2"),
                          MagazineTask.Article("author3", "title3", "description3")]

        isDeleted = MagazineTask.ArticlesManager.deleteAnArticle(self, 3,listOfArticles)
        self.assertEqual(isDeleted,False)

#class TestUpdateAnArticle(unittest.TestCase):
 #   def test_updateAnArticle_equal(self):
  #      listOfArticles = [MagazineTask.Article("author1","title1","description1")]
   #     with mock.patch('MagazineTask.ManageArticles.deleteAnArticle',return_value=True):
    #        deleteResult = MagazineTask.ManageArticles.deleteAnArticle(self,1,listOfArticles)

     #   with mock.patch('MagazineTask.ManageArticles.createArticle',return_value=MagazineTask.Article("updated author", "updated title", "updated description")):
      #      createResult = MagazineTask.ManageArticles.createArticle(self,1,listOfArticles)
       # article = MagazineTask.ManageArticles.updateAnArticle(self,1,listOfArticles,createResult)
        #self.assertEqual(article, listOfArticles[0])
if __name__ == '__main__':
    unittest.main()
