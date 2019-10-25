# coding=utf-8
import os, fnmatch
from win32com import client
from win32com.client import Dispatch

'''
Pywin32实现格式转换
插件：win32com 
下载：pip install pywin32
引入：from win32com import client as wc
'''
'''
操作文件和目录
os.name  判断操作系统类型如果是posix，说明系统是Linux、Unix或Mac OS X，如果是nt，就是Windows系统
os.uname()  获取详细的系统消息（Windows上不提供）
os.path.abspath(r"相对路径")  相对路径转绝对路径
os.path.abspath('.')  查看当前目录的绝对路径
os.path.split("绝对路径") 拆分文件路径、文件名
os.path.join(A, B)  合并A、B两个路径
os.path.exists("绝对路径")  检查该绝对路径是否存在
os.makedirs("绝对路径")、os.mkdir("绝对路径")  创建目录
os.rmdir("绝对路径")  删掉一个目录
os.path.isdir("绝对路径") 判断是否是文件夹/目录
os.path.isfile("绝对路径") 判断是否是文件
fnmatch.fnmatch("原文"，"要匹配的内容")  匹配文件
client.Dispatch('Word.Application').Documents.Open("文件名").SaveAs("新路径",4)  打开提取文件内容并保存
client.Dispatch('Word.Application').Documents.Open("文件名").Close()  关闭文件
'''

def File2Txt(filePath, savepath = ''):
    try:
        # 拆分文件路径、文件名（os.path.split()）
        path,name = os.path.split(filePath)
        print('文件路径：', path)
        print('文件名：', name)

        # 匹配文件并修改文件后缀（fnmatch.fnmatch()）
        typename = os.path.splitext(name)[-1].lower()
        new_name = TranType(name,typename)
        print('新名字：', new_name)

        # 目标路径：合并新路径和新名字（os.path.join()）
        if savepath == '':
            savepath = path
        else:
            savepath = savepath
        new_path = os.path.join(savepath, new_name)
        print('最终保存路径：', new_path)
        
        # 提取文件内容（client.Dispatch）
        fileapp = client.Dispatch('Word.Application')
        mytxt = fileapp.Documents.Open(filePath)
        print(mytxt)

        # 保存文本信息到目标路径（SaveAs）
        mytxt.SaveAs(new_path,4)
        mytxt.Close()
    except Exception as e:
        pass

# 支持转码的类型
def TranType(filename,typename):
    # 新的文件名称
    new_name = ""
    if typename == '.pdf' :
        if fnmatch.fnmatch(filename,'*.pdf') :
            new_name = filename[:-4]+'.txt'
        else: return
    elif typename == '.doc' or typename == '.docx' : 
        if fnmatch.fnmatch(filename, '*.doc') :
            new_name = filename[:-4]+'.txt'
        elif fnmatch.fnmatch(filename, '*.docx'):
            new_name = filename[:-5]+'.txt'
        else: return
    else:
        print('警告：\n您输入[',typename,']不合法，本工具支持pdf/doc/docx格式,请输入正确格式。')
        return
    return new_name

# 遍历转码
class TraversalFun():
    def __init__(self, rootDir, func = None, saveDir = ""):
        self.rootDir = rootDir # 目录路径
        self.saveDir = saveDir # 保存路径
        self.func = func   # 参数方法
    
    def TraversalDir(self):
        # 切分文件上级目录和文件夹名称
        dirs,folder_name = os.path.split(self.rootDir)
        print('上级目录和文件夹名称', dirs, folder_name)

        # 目标目录绝对路径（os.path.abspath()、os.path.join()）
        save_dir = ""
        if self.saveDir == "": 
            save_dir = os.path.abspath(os.path.join(dirs,'new_' + folder_name))
        else: save_dir = self.saveDir

        # 若绝对路径不存在，创建一个目录文件（os.path.exists()、os.makedirs()）
        if not os.path.exists(save_dir): os.makedirs(save_dir)
        print("保存目录：", save_dir)

        # 递归遍历并对文件进行转码
        TraversalFun.AllFiles(self,self.rootDir,save_dir)

    # 3 递归遍历所有文件，并提供具体文件操作功能
    def AllFiles(self, rootDir, save_dir = ''):
        # 指定目录包含的文件或文件夹的名字的列表
        for lists in os.listdir(rootDir):
            # 当前文件夹的绝对路径
            path = os.path.join(rootDir, lists)

            # 是文件：对文件进行操作
            if os.path.isfile(path):
                self.func(os.path.abspath(path),os.path.abspath(save_dir))

            # 是文件夹：对文件夹进行操作
            if os.path.isdir(path):
                # 当前文件夹的绝对路径
                newpath = os.path.join(save_dir, lists)

                # 创建目录文件
                if not os.path.exists(newpath):
                    os.mkdir(newpath)

                # 递归遍历
                TraversalFun.AllFiles(self,path,newpath)

if __name__ == '__main__':
    # 要遍历的文件夹和目标文件夹
    rootDir = os.path.abspath(r"../python")   
    saveDir = os.path.abspath(r"../test")

    tra = TraversalFun(rootDir, File2Txt, saveDir)
    tra.TraversalDir()

