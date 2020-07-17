import unittest
import MagazineTask

class MyTestCase(unittest.TestCase):
    def test_createArticle(self):
        article = MagazineTask.Article("aa","aa","aa")
        resultArticle = MagazineTask.createArticle("aa","aa","aa")
        self.assertEqual(article,resultArticle)

if __name__ == '__main__':
    unittest.main()
