# 1 四句格言

>1.不要这样做
>
>2.没有什么是真的，一切可能都有问题
>
>3.它起作用,并不意味着它没有问题
>
>4.你仍然必须理解它

## 1.1 不要使用它

避免并发副作用的最简单方法就是不用。虽然它似乎足够安全，但它存在无数微妙的陷阱。

证明并发性的唯一因素是速度。只是希望运行更快是不合理的 - 首先应用一个分析器来发现你是否可以执行其他一些优化。

如果被迫并发，请采取最简单安全的实现。使用已有库并尽可能少写自己的代码。有了并发，就没有什么“简单事”。

## 1.2 一切都可能有问题

没有并发性的世界有一定的顺序和一致性。通过简单地将变量赋值给某个值，很明显它应该始终正常工作。

而在并发领域，必须质疑一切。即使将变量设置为某个值也可能不会按预期的方式工作。

在非并发程序中你可以忽略的各种事情突然变得非常重要。
例如，你必须知道处理器缓存以及保持本地缓存与主内存一致的问题。
必须了解对象构造的深度复杂性，以便你的构造对象不会意外地将数据暴露给其他线程更改。

## 1.3 起作用不意味着没问题

很容易编写出一个看似完美，实则有问题的并发程序，往往问题在极端情况下才暴露 - 在部署后不可避免地出现用户问题。

- 你无法证明并发程序是正确的，只能（有时）证明它是不正确的
- 大多数情况下即使它有问题，你可能也无法检测到
- 你通常无法编写有用的测试，因此必须依靠代码检查结合深入的并发知识来发现错误
- 即使是有效的程序也只能在其设计参数下工作。当超出这些设计参数时，大多数并发程序会以某种方式失败。

在其他Java主题中，我们培养了一种感觉-决定论。一切都按照语言的承诺（或隐含）进行，这是令人欣慰和期待的 - 毕竟，编程语言的目的是让机器做我们想要的。
从确定性编程的世界进入并发编程领域，有种称为[Dunning-Kruger](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect)效应的认知偏差
概括为“你知道得越少，你以为你知道得越多。”这意味着，相对不熟练的人拥有着虚幻的自我优越感，错误地评估他们的能力远高于实际。

无论你多么确定代码是线程安全的，它可能已经无效了。你可以很容易地了解所有的问题，然后几个月或几年后你会发现一些概念让你意识到你编写的大多数内容实际上都容易受到并发错误的影响。当某些内容不正确时，编译器不会告诉你。为了使它正确，你必须在研究代码时在脑里模拟所有并发问题。

在Java的所有非并发领域，“没有明显的错误和没有明显的编译错误”似乎意味着一切都好。而对于并发，没有任何意义。

## 1.4 必须理解

在格言1-3之后，你可能会对并发性感到害怕，并且认为，“到目前为止，我已经避免了它，也许我可以继续避免。

你可能知道其他编程语言更好地设计用于构建并发程序 - 甚至是在JVM上运行的程序，例如Clojure或Scala。为什么不用这些语言编写并发部分并将Java用于其他所有部分呢？

唉，你不能轻易逃脱，即使你从未明确地创建一个线程，但可能你使用的框架创建了 - 例如，Swing或者像**Timer** 定时器。
最糟糕的事情：当你创建组件，你必须假设这些组件可能在多线程环境中重用。即使你的解决方案是放弃并声明你的组件“非线程安全”，你仍然必须知道这样的声明是重要的，它是什么意思

人们有时会认为并发性太难，不能包含在介绍语言的书中。认为并发是一个独立主题，在日常编程中出现的少数情况（例如图形用户界面）可以用特殊的习语来处理。如果你可以避免它，为什么要介绍这样的复杂的主题。
不幸的是，你无法选择何时在Java程序中出现线程。你从未写过自己的线程，并不意味可以避免编写线程代码。例如Web系统本质上是多线程的Web服务器通常包含多个处理器，而并行性是利用这些处理器的理想方式。这样的系统看起来简单，必须理解并发才能正确地编写它。

Java是一种多线程语言，肯定存在并发问题。因此，有许多Java程序正在使用中，或者只是偶然工作，或者大部分时间工作并且不时地发生问题。有时这种问题是相对良性的，但有时它意味着丢失有价值的数据，如果你没有意识到并发问题，你最终可能会把问题放在其他地方而不是你的代码。如果将程序移动到多处理器系统，则可以暴露或放大这类问题。基本上，了解并发性使你意识到正确的程序可能会表现出错误的行为。

# 2 残酷的真相

Java是在充满自信，热情和睿智的氛围中创建的。在发明一种编程语言时，很容易就像语言的初始可塑性会持续存在一样，你可以把某些东西拿出来，如果不能解决问题，那么就修复它。一旦人们开始使用你的语言，变化就会变得更加严重。
语言设计的过程本身就是一门艺术。
通过匆忙设计语言而产生的认知负荷和技术债务最终会赶上我们。

[Turing completeness](https://en.wikipedia.org/wiki/Turing_completeness)是不足够的;语言需要更多的东西：它们必须能够创造性地表达，而不是用不必要的东西来衡量我们。解放我们的心理能力只是为了扭转并再次陷入困境，这是毫无意义的。我承认，尽管存在这些问题，我们已经完成了令人惊奇的事情，但我也知道如果没有这些问题我们能做得更多。

热情使原始Java设计师因为看起来有必要而投入功能。信心（以及原始语言）让他们认为任何问题都可以解决。
有人认为任何加入Java的东西是固定的和永久性的 - 这是非常有信心，相信第一个决定永远是正确的，因此我们看到Java的体系中充斥着糟糕的决策。其中一些决定最终没有什么后果，例如你可以告诉人们不要使用Vector，但保留了对之前版本的支持。

线程包含在Java 1.0中。当然，并发性是影响语言的基本语言设计决策，很难想象以后才添加它，客观的说，当时并不清楚基本的并发性。像C能够将线程视为一个附加功能，因此Java设计师也纷纷效仿，包括一个Thread类和必要的JVM支持。
C语言是原始的，这限制了它的野心。这些限制使附加线程库合理。当采用原始模型并将其粘贴到复杂语言中时，Java的大规模扩展迅速暴露了基本问题。在Thread类中的许多方法的弃用以及后续的高级库浪潮中，这种情况变得明显，这些库试图提供更好的并发抽象。

为了在高级语言中获得并发性，所有语言功能都会受到影响，例如标识符为可变值。在函数和方法中，所有不变和防止副作用的方法都会导致简化并发编程（纯函数式编程语言基础）的变化，但当时对于主流语言的创建者来说似乎是奇怪的想法。最初的Java设计师要么对这些选择有所了解，要么认为它们太不同了，并且会抛弃许多潜在的语言采用者。语言设计社区当时根本没有足够的经验来理解调整在线程库中的影响。

Java经历告诉我们，结果是相当灾难性的。程序员很容易陷入认为Java 线程并不那么困难的陷阱。工作的程序充满了微妙的并发bug。
为了获得正确的并发性，语言功能必须从头开始设计并考虑并发性。Java将不再是为并发而设计的语言，而只是一种允许它的语言。
尽管有这些基本的不可修复的缺陷，Java的后续版本添加了库，以便在使用并发时提升抽象级别。事实上，我根本不会想到有可能在Java 8中进行改进：并行流和**CompletableFutures** 史诗般的变化。
重点介绍并行流和**CompletableFutures**。虽然它们可以大大简化你对并发和后续代码的思考方式，但基本问题仍然存在：由于Java的原始设计，代码的所有部分仍然容易受到攻击，你仍然必须理解这些复杂和微妙的问题。Java中的线程绝不是简单或安全的;那种经历必须降级为另一种更新的语言。

# 4 创建和运行任务

任务是一段可以独立运行的代码。

为了解释创建和运行任务的一些基础知识，本节介绍一种比并行流或CompletableFutures更简单的机制：Executor。
Executor管理一些低级Thread对象（Java中并发的最原始形式）。你创建一个任务，然后将其交给Executor运行。

有多种类型的Executor用于不同的目的。在这里，我们将展示规范形式，代表创建和运行任务的最简单和最佳方法。

# 5 终止长时间运行的任务

任务独立运行，因此需要一种机制来关闭它们。典型的方法使用一个标志，这引入共享内存问题，我们将使用Java的“Atomic”库规避。

## 6 Completable Futures

当你将衣服带到干洗店时，他们会给你一张收据。你继续完成其他任务，最终你的衣服很干净，你可以拿起它。收据是你与干洗店在后台执行的任务的连接。这是Java 5中引入的Future。

Future比以前的方法更方便，但你仍然必须出现并用收据取回干洗，并等待任务是否完成。对于一系列操作，Futures并没有真正帮助那么多。

Java8 的 CompletableFuture 是一个更好的解决方案：它允许你将操作链接在一起，因此你不必将代码写入接口串行的操作。有了CompletableFuture，就可以更容易地做出“采购原料，组合原料，烹饪食物，提供食物，清理菜肴，储存菜肴”等一系列链式的串行操作。

# 7 死锁

某些任务必须阻塞等待其他任务的结果。被阻塞的任务有可能等待另一个阻塞的任务。如果被阻塞的任务链循环到第一个，还是没有人可以取得任何进展，你就会陷入死锁。

最大的问题在运行程序时没有立即出现死锁。你的系统可能容易出现死锁，并且只会在某些条件下死锁。程序可能在某个平台上运行正常，例如你的开发机器，但部署到不同的硬件时死锁。

死锁通常源于细微的编程错误;一系列无心的决定，最终意外地创建了一个依赖循环。

# Parallel Streams（并行流）

可以通过简单地将parallel()添加到表达式来并行化流。这是一种简单，强大，坦率地说是利用多处理器的惊人方式。

添加parallel()来提高速度似乎是微不足道的，演示并解释一些盲目添加parallel()到Stream表达式的缺陷。

Java 8流的一个显着优点是，在某些情况下，它们可以很容易地并行化。这来自精心的库设计，特别是流使用内部迭代 - 它们控制着自己的迭代器。他们使用一种特殊的迭代器Spliterator，被限制为易于自动分割。简单用parallel()然后流中的所有内容都作为一组并行任务运行。如果你的代码是使用Streams编写的，那么并行化以提高速度似乎是一种琐事。

考虑来自Streams的Prime.java。

- 查找质数：
  ![](https://img-blog.csdnimg.cn/2020070523310519.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_SmF2YUVkZ2U=,size_16,color_FFFFFF,t_70)

当注释掉parallel()行时，结果大约是parallel()的三倍。
并行流似乎是一个甜蜜的交易。你所需要做的就是将编程问题转换为流，然后插入parallel()以加快速度。有时这很容易，但有陷阱。

## parallel()不是灵丹妙药

流和并行流的不确定性的探索：求和数字的增量序列。
从一个计时方法rigorously 开始，它采用**LongSupplier**，测量**getAsLong()**调用的长度，将结果与**checkValue**进行比较并显示结果。

```java
// concurrent/Summing.java
import java.util.stream.*;
import java.util.function.*;
import onjava.Timer;
public class Summing {
    static void timeTest(String id, long checkValue,    LongSupplier operation){
        System.out.print(id + ": ");
        Timer timer = newTimer();
        long result = operation.getAsLong();
        if(result == checkValue)
            System.out.println(timer.duration() + "ms");
        else
            System.out.format("result: %d%ncheckValue: %d%n", result, checkValue);
        }
    public static final int SZ = 100_000_000;// This even works://
    public static final int SZ = 1_000_000_000;
    public static final long CHECK = (long)SZ * ((long)SZ + 1)/2; // Gauss's formula
    public static void main(String[] args){
        System.out.println(CHECK);
        timeTest("Sum Stream", CHECK, () ->
        LongStream.rangeClosed(0, SZ).sum());
        timeTest("Sum Stream Parallel", CHECK, () ->
        LongStream.rangeClosed(0, SZ).parallel().sum());
        timeTest("Sum Iterated", CHECK, () ->
        LongStream.iterate(0, i -> i + 1)
        .limit(SZ+1).sum());
        // Slower & runs out of memory above 1_000_000:
        // timeTest("Sum Iterated Parallel", CHECK, () ->
        //   LongStream.iterate(0, i -> i + 1)
        //     .parallel()
        //     .limit(SZ+1).sum());
    }
}
```

输出结果：

```
5000000050000000
Sum Stream: 167ms
Sum Stream Parallel: 46ms
Sum Iterated: 284ms
```

**CHECK**值是使用Carl Friedrich Gauss在1700年代后期仍在小学时创建的公式计算出来的.

**main()** 的第一个版本使用直接生成 **Stream** 并调用 **sum()** 的方法。我们看到流的好处在于十亿分之一的SZ在没有溢出的情况下处理（我使用较小的数字，因此程序运行时间不长）。使用 **parallel()** 的基本范围操跟快。

如果使用**iterate()**来生成序列，则减速是戏剧性的，可能是因为每次生成数字时都必须调用lambda。但是如果我们尝试并行化，那么结果通常比非并行版本花费的时间更长，但是当**SZ**超过一百万时，它也会耗尽内存（在某些机器上）。当然，当你可以使用**range()**时，你不会使用**iterate()**，但如果你生成的东西不是简单的序列，你必须使用**iterate()**。应用**parallel()**是一个合理的尝试，但会产生令人惊讶的结果。我们将在后面的部分中探讨内存限制的原因，但我们可以对流并行算法进行初步观察：

- 流并行性将输入数据分成多个部分，因此算法可以应用于那些单独的部分。
- 阵列分割成本低廉，均匀且具有完美的分裂知识。
- 链接列表没有这些属性;“拆分”一个链表仅仅意味着把它分成“第一元素”和“其余列表”，这相对无用。
- 无状态生成器的行为类似于数组;使用上述范围是无可争议的。
- 迭代生成器的行为类似于链表; **iterate()** 是一个迭代生成器。

现在让我们尝试通过在数组中填充值来填充数组来解决问题。因为数组只分配了一次，所以我们不太可能遇到垃圾收集时序问题。

首先我们将尝试一个充满原始**long**的数组：

```java
// concurrent/Summing2.java
// {ExcludeFromTravisCI}import java.util.*;
public class Summing2 {
    static long basicSum(long[] ia) {
        long sum = 0;
        int size = ia.length;
        for(int i = 0; i < size; i++)
            sum += ia[i];return sum;
    }
    // Approximate largest value of SZ before
    // running out of memory on mymachine:
    public static final int SZ = 20_000_000;
    public static final long CHECK = (long)SZ * ((long)SZ + 1)/2;
    public static void main(String[] args) {
        System.out.println(CHECK);
        long[] la = newlong[SZ+1];
        Arrays.parallelSetAll(la, i -> i);
        Summing.timeTest("Array Stream Sum", CHECK, () ->
        Arrays.stream(la).sum());
        Summing.timeTest("Parallel", CHECK, () ->
        Arrays.stream(la).parallel().sum());
        Summing.timeTest("Basic Sum", CHECK, () ->
        basicSum(la));// Destructive summation:
        Summing.timeTest("parallelPrefix", CHECK, () -> {
            Arrays.parallelPrefix(la, Long::sum);
        return la[la.length - 1];
        });
    }
}
```

输出结果：

```
200000010000000
Array Stream
Sum: 104ms
Parallel: 81ms
Basic Sum: 106ms
parallelPrefix: 265ms
```

第一个限制是内存大小;因为数组是预先分配的，所以我们不能创建几乎与以前版本一样大的任何东西。并行化可以加快速度，甚至比使用 **basicSum()** 循环更快。有趣的是， **Arrays.parallelPrefix()** 似乎实际上减慢了速度。但是，这些技术中的任何一种在其他条件下都可能更有用 - 这就是为什么你不能做出任何确定性的声明，除了“你必须尝试一下”。”

最后，考虑使用盒装**Long**的效果:

```java
// concurrent/Summing3.java
// {ExcludeFromTravisCI}
import java.util.*;
public class Summing3 {
    static long basicSum(Long[] ia) {
        long sum = 0;
        int size = ia.length;
        for(int i = 0; i < size; i++)
            sum += ia[i];
            return sum;
    }
    // Approximate largest value of SZ before
    // running out of memory on my machine:
    public static final int SZ = 10_000_000;
    public static final long CHECK = (long)SZ * ((long)SZ + 1)/2;
    public static void main(String[] args) {
        System.out.println(CHECK);
        Long[] aL = newLong[SZ+1];
        Arrays.parallelSetAll(aL, i -> (long)i);
        Summing.timeTest("Long Array Stream Reduce", CHECK, () ->
        Arrays.stream(aL).reduce(0L, Long::sum));
        Summing.timeTest("Long Basic Sum", CHECK, () ->
        basicSum(aL));
        // Destructive summation:
        Summing.timeTest("Long parallelPrefix",CHECK, ()-> {
            Arrays.parallelPrefix(aL, Long::sum);
            return aL[aL.length - 1];
            });
    }
}
```

输出结果：

```
50000005000000
Long Array
Stream Reduce: 1038ms
Long Basic
Sum: 21ms
Long parallelPrefix: 3616ms
```

现在可用的内存量大约减半，并且所有情况下所需的时间都会很长，除了**basicSum()**，它只是循环遍历数组。令人惊讶的是， **Arrays.parallelPrefix()** 比任何其他方法都要花费更长的时间。

我将 **parallel()** 版本分开了，因为在上面的程序中运行它导致了一个冗长的垃圾收集，扭曲了结果：

```java
// concurrent/Summing4.java
// {ExcludeFromTravisCI}
import java.util.*;
public class Summing4 {
    public static void main(String[] args) {
        System.out.println(Summing3.CHECK);
        Long[] aL = newLong[Summing3.SZ+1];
        Arrays.parallelSetAll(aL, i -> (long)i);
        Summing.timeTest("Long Parallel",
        Summing3.CHECK, () ->
        Arrays.stream(aL)
        .parallel()
        .reduce(0L,Long::sum));
    }
}
```

输出结果：

```
50000005000000
Long Parallel: 1014ms
```

它比非parallel()版本略快，但并不显着。

这种时间增加的一个重要原因是处理器内存缓存。使用**Summing2.java**中的原始**long**，数组**la**是连续的内存。处理器可以更容易地预测该阵列的使用，并使缓存充满下一个需要的阵列元素。访问缓存比访问主内存快得多。似乎 **Long parallelPrefix** 计算受到影响，因为它为每个计算读取两个数组元素，并将结果写回到数组中，并且每个都为**Long**生成一个超出缓存的引用。

使用**Summing3.java**和**Summing4.java**，**aL**是一个**Long**数组，它不是一个连续的数据数组，而是一个连续的**Long**对象引用数组。尽管该数组可能会在缓存中出现，但指向的对象几乎总是超出缓存。

这些示例使用不同的SZ值来显示内存限制。

为了进行时间比较，以下是SZ设置为最小值1000万的结果：

**Sum Stream: 69msSum
Stream Parallel: 18msSum
Iterated: 277ms
Array Stream Sum: 57ms
Parallel: 14ms
Basic Sum: 16ms
parallelPrefix: 28ms
Long Array Stream Reduce: 1046ms
Long Basic Sum: 21ms
Long parallelPrefix: 3287ms
Long Parallel: 1008ms**

虽然Java 8的各种内置“并行”工具非常棒，但我认为它们被视为神奇的灵丹妙药：“只需添加parallel()并且它会更快！”我希望我已经开始表明情况并非所有都是如此，并且盲目地应用内置的“并行”操作有时甚至会使运行速度明显变慢。

- parallel()/limit()交点

使用parallel()时会有更复杂的问题。从其他语言中吸取的流是围绕无限流模型设计的。如果你拥有有限数量的元素，则可以使用集合以及为有限大小的集合设计的关联算法。如果你使用无限流，则使用针对流优化的算法。

Java 8将两者合并起来。例如，**Collections**没有内置的**map()**操作。在Collection和Map中唯一类似流的批处理操作是**forEach()**。如果要执行**map()**和**reduce()**等操作，必须首先将Collection转换为存在这些操作的Stream:

```java
// concurrent/CollectionIntoStream.java
import onjava.*;
import java.util.*;
import java.util.stream.*;
public class CollectionIntoStream {
    public static void main(String[] args) {
    List<String> strings = Stream.generate(new Rand.String(5))
    .limit(10)
    .collect(Collectors.toList());
    strings.forEach(System.out::println);
    // Convert to a Stream for many more options:
    String result = strings.stream()
    .map(String::toUpperCase)
    .map(s -> s.substring(2))
    .reduce(":", (s1, s2) -> s1 + s2);
    System.out.println(result);
    }
}
```

输出结果：

```
pccux
szgvg
meinn
eeloz
tdvew
cippc
ygpoa
lkljl
bynxt
:PENCUXGVGINNLOZVEWPPCPOALJLNXT
```

**Collection**确实有一些批处理操作，如**removeAll()**，**removeIf()**和**retainAll()**，但这些都是破坏性的操作.**ConcurrentHashMap**对**forEachand**和**reduce**操作有特别广泛的支持。

在许多情况下，只在集合上调用**stream()**或者**parallelStream()**没有问题。但是，有时将**Stream**与**Collection**混合会产生意外。这是一个有趣的难题：

```java
// concurrent/ParallelStreamPuzzle.java
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
public class ParallelStreamPuzzle {
    static class IntGenerator
    implements Supplier<Integer> {
        private int current = 0;
        public Integer get() {
            return current++;
        }
    }
    public static void main(String[] args) {
        List<Integer> x = Stream.generate(newIntGenerator())
        .limit(10)
        .parallel()  // [1]
        .collect(Collectors.toList());
        System.out.println(x);
    }
}
/* Output:
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
*/
```

如果[1]注释运行它，它会产生预期的：
**[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]**
每次。但是包含了parallel()，它看起来像一个随机数生成器，带有输出（从一次运行到下一次运行不同），如：
**[0, 3, 6, 8, 11, 14, 17, 20, 23, 26]**
这样一个简单的程序怎么会这么破碎呢？让我们考虑一下我们在这里要实现的目标：“并行生成。”“那意味着什么？一堆线程都在拉动一个生成器，在某种程度上选择一组有限的结果？代码使它看起来很简单，但它转向是一个特别凌乱的问题。

为了看到它，我们将添加一些仪器。由于我们正在处理线程，因此我们必须将任何跟踪信息捕获到并发数据结构中。在这里我使用**ConcurrentLinkedDeque**：

```java
// concurrent/ParallelStreamPuzzle2.java
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
import java.nio.file.*;
public class ParallelStreamPuzzle2 {
    public static final Deque<String> trace =
    new ConcurrentLinkedDeque<>();
    static class
    IntGenerator implements Supplier<Integer> {
        private AtomicInteger current =
        new AtomicInteger();
        public Integerget() {
            trace.add(current.get() + ": " +Thread.currentThread().getName());
            return current.getAndIncrement();
        }
    }
    public static void main(String[] args) throws Exception {
    List<Integer> x = Stream.generate(newIntGenerator())
    .limit(10)
    .parallel()
    .collect(Collectors.toList());
    System.out.println(x);
    Files.write(Paths.get("PSP2.txt"), trace);
    }
}
```

输出结果：

```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

current是使用线程安全的 **AtomicInteger** 类定义的，可以防止竞争条件；**parallel()**允许多个线程调用**get()**。

在查看 **PSP2.txt**.**IntGenerator.get()** 被调用1024次时，你可能会感到惊讶。

**0: main
1: ForkJoinPool.commonPool-worker-1
2: ForkJoinPool.commonPool-worker-2
3: ForkJoinPool.commonPool-worker-2
4: ForkJoinPool.commonPool-worker-1
5: ForkJoinPool.commonPool-worker-1
6: ForkJoinPool.commonPool-worker-1
7: ForkJoinPool.commonPool-worker-1
8: ForkJoinPool.commonPool-worker-4
9: ForkJoinPool.commonPool-worker-4
10: ForkJoinPool.commonPool-worker-4
11: main
12: main
13: main
14: main
15: main...10
17: ForkJoinPool.commonPool-worker-110
18: ForkJoinPool.commonPool-worker-610
19: ForkJoinPool.commonPool-worker-610
20: ForkJoinPool.commonPool-worker-110
21: ForkJoinPool.commonPool-worker-110
22: ForkJoinPool.commonPool-worker-110
23: ForkJoinPool.commonPool-worker-1**

这个块大小似乎是内部实现的一部分（尝试使用**limit()**的不同参数来查看不同的块大小）。将**parallel()**与**limit()**结合使用可以预取一串值，作为流输出。

试着想象一下这里发生了什么：一个流抽象出无限序列，按需生成。当你要求它并行产生流时，你要求所有这些线程尽可能地调用get()。添加limit()，你说“只需要这些。”基本上，当你将parallel()与limit()结合使用时，你要求随机输出 - 这可能对你正在解决的问题很好。但是当你这样做时，你必须明白。这是一个仅限专家的功能，而不是要争辩说“Java弄错了”。

什么是更合理的方法来解决问题？好吧，如果你想生成一个int流，你可以使用IntStream.range()，如下所示：

```java
// concurrent/ParallelStreamPuzzle3.java
// {VisuallyInspectOutput}
import java.util.*;
import java.util.stream.*;
public class ParallelStreamPuzzle3 {
    public static void main(String[] args) {
    List<Integer> x = IntStream.range(0, 30)
        .peek(e -> System.out.println(e + ": " +Thread.currentThread()
        .getName()))
        .limit(10)
        .parallel()
        .boxed()
        .collect(Collectors.toList());
        System.out.println(x);
    }
}
```

输出结果：

```
8: main
6: ForkJoinPool.commonPool-worker-5
3: ForkJoinPool.commonPool-worker-7
5: ForkJoinPool.commonPool-worker-5
1: ForkJoinPool.commonPool-worker-3
2: ForkJoinPool.commonPool-worker-6
4: ForkJoinPool.commonPool-worker-1
0: ForkJoinPool.commonPool-worker-4
7: ForkJoinPool.commonPool-worker-1
9: ForkJoinPool.commonPool-worker-2
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

为了表明**parallel()**确实有效，我添加了一个对**peek()**的调用，这是一个主要用于调试的流函数：它从流中提取一个值并执行某些操作但不影响从流向下传递的元素。注意这会干扰线程行为，但我只是尝试在这里做一些事情，而不是实际调试任何东西。

你还可以看到boxed()的添加，它接受int流并将其转换为Integer流。

现在我们得到多个线程产生不同的值，但它只产生10个请求的值，而不是1024个产生10个值。

它更快吗？一个更好的问题是：什么时候开始有意义？当然不是这么小的一套;上下文切换的代价远远超过并行性的任何加速。当一个简单的数字序列并行生成时，有点难以想象。如果你使用昂贵的产品，它可能有意义 - 但这都是猜测。唯一知道的是通过测试。记住这句格言：“首先制作它，然后快速制作 - 但只有你必须这样做。”**parallel()**和**limit()**仅供专家使用（并且要清楚，我不认为自己是这里的专家）。

- 并行流只看起来很容易

实际上，在许多情况下，并行流确实可以毫不费力地更快地产生结果。但正如你所见，只需将**parallel()**打到你的Stream操作上并不一定是安全的事情。在使用**parallel()**之前，你必须了解并行性如何帮助或损害你的操作。有个错误认识是认为并行性总是一个好主意。事实上并不是。Stream意味着你不需要重写所有代码以便并行运行它。流什么都不做的是取代理解并行性如何工作的需要，以及它是否有助于实现你的目标。

参见【Java并发编程-创建任务】

## 终止耗时任务（Terminating Long-Running Tasks）

并发程序通常使用长时间运行的任务。可调用任务在完成时返回值，虽然这给它一个有限的寿命，但仍可能很长。可运行任务有时被设置为永远运行的后台进程。你经常需要一种方法在正常完成之前停止**Runnable**和**Callable**任务，例如当你关闭程序时！

Java初期提供中断运行任务的机制（为向后兼容，现仍存在），中断机制包括阻塞问题。中断任务又乱又复杂，因为你必须了解可能发生中断的所有可能状态及可能导致的数据丢失。使用中断被视为反模式，但我们仍然被迫接受。InterruptedException就是因为设计的向后兼容性残留。

### 任务终止的最佳实践

设置任务周期性检查的标志，然后任务就能通过自己的shutdown进程并正常终止。不是在任务中随机关闭线程，而是要求任务在到达一个较好时机自行终止。这总能产生比中断更好的结果以及更易理解、更合理的代码。

设置任务能看到的boolean flag。编写任务，以便定期检查标志并执行正常终止。但这操作起来还是有个老大难问题了：**共同的可变状态**。若该标志能被另一个任务操纵，则存在碰撞的可能性。

对此，你也知道很多解决方案，比如**volatile**。本文将使用更简单的技术并避免所有易变参数。

Java 5引入**Atomic**类，提供了一组可以使用的类型，而不必担心并发问题。

添加**AtomicBoolean**标志，告诉任务清理自己并退出。

![](https://img-blog.csdnimg.cn/c5e5229acdad468a9ea711843054e8b4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_SmF2YUVkZ2U=,size_20,color_FFFFFF,t_70,g_se,x_16)

虽然多个任务能在同一实例上成功调用**quit()**，但**AtomicBoolean**可防止多个任务同时实际修改**running**，从而保证**quit()**方法线程安全。

需要**running AtomicBoolean**说明编写并发时最基本的困难之一是：若running是普通布尔值，你可能无法在执行程序中看到问题。该例中，你可能永远不会有任何问题，但代码仍不安全！编写表明该问题的demo可能很困难或不可能。因此，你也没有任何反馈来告诉你已经做错了。通常，你编写线程安全代码的唯一方法就是通过了解事情可能出错的所有细微之处。

作为测试，我们将启动很多QuittableTasks然后关闭它们。尝试使用较大COUNT值

![](https://img-blog.csdnimg.cn/e509efe6dd454aef9067dbd0f3e0f390.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_SmF2YUVkZ2U=,size_20,color_FFFFFF,t_70,g_se,x_16)

结果：

![](https://img-blog.csdnimg.cn/1fe90fd7cbdb41b9b2c67ca1cbd6a598.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_SmF2YUVkZ2U=,size_20,color_FFFFFF,t_70,g_se,x_16)

使用**peek()**将**QuittableTasks**传给**ExecutorService**，然后将这些任务收集到**List.main()**，只要任何任务仍在运行，就会阻止程序退出。即使为每个任务按顺序调用quit()方法，任务也不会按照它们创建的顺序关闭。独立运行的任务不会确定性地响应信号。

## CompletableFuture类

开始使用CompletableFutures：

![](https://img-blog.csdnimg.cn/05fa3094963e45b3a6f04a5d47ef9e0e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_SmF2YUVkZ2U=,size_20,color_FFFFFF,t_70,g_se,x_16)

输出结果：

![](https://img-blog.csdnimg.cn/80a6b49bb0d144c1ba9f3d1fef21c58f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_SmF2YUVkZ2U=,size_20,color_FFFFFF,t_70,g_se,x_16)

任务**List <QuittableTask>**，但该例中，没有**peek()**将每个**QuittableTask**提交给**ExecutorService**。相反，在创建cfutures期间，每个任务都交给**CompletableFuture::runAsync**。这执行**VerifyTask.run(**)并返回**CompletableFuture <Void>**。因为**run()**不返回任何内容，所以在这种情况下我只使用**CompletableFuture**调用**join()**来等待它完成。

该例中运行任务无需**ExecutorService**，这都由**CompletableFuture**管理（尽管有提供自定义**ExecutorService**选项）。也无需调用**shutdown()**。除非明确调用**join()**，程序将尽快退出，而不需要等待任务完成。

### 基本用法

这是一个带有静态方法**work()**的类，它对该类的对象执行某些工作：

```java
// concurrent/Machina.java
import onjava.Nap;
public class Machina {
    public enum State {
        START, ONE, TWO, THREE, END;
        State step() {
            if(equals(END))
            return END;
            return values()[ordinal() + 1];
        }
    }
    private State state = State.START;
    private final int id;
    public Machina(int id) {
        this.id = id;
    }
    public static Machina work(Machina m) {
        if(!m.state.equals(State.END)){
            new Nap(0.1);
            m.state = m.state.step();
        }
        System.out.println(m);return m;
    }
    @Override
    public StringtoString() {
        return"Machina" + id + ": " +      (state.equals(State.END)? "complete" : state);
    }
}

```

这是一个有限状态机，一个微不足道的机器，因为它没有分支......它只是从头到尾遍历一条路径。**work()**方法将机器从一个状态移动到下一个状态，并且需要100毫秒才能完成“工作”。

我们可以用**CompletableFuture**做的一件事是使用**completedFuture()**将它包装在感兴趣的对象中

```java
// concurrent/CompletedMachina.java
import java.util.concurrent.*;
public class CompletedMachina {
    public static void main(String[] args) {
        CompletableFuture<Machina> cf =
        CompletableFuture.completedFuture(
            new Machina(0));
        try {
            Machina m = cf.get();  // Doesn't block
        } catch(InterruptedException |
            ExecutionException e) {
        throw new RuntimeException(e);
        }
    }
}
```

**completedFuture()**创建一个“已经完成”的**CompletableFuture**。对这样一个未来做的唯一有用的事情是**get()**里面的对象，所以这看起来似乎没有用。注意**CompletableFuture**被输入到它包含的对象。这个很重要。

通常，**get()**在等待结果时阻塞调用线程。此块可以通过**InterruptedException**或**ExecutionException**中断。在这种情况下，阻止永远不会发生，因为CompletableFutureis已经完成，所以答案立即可用。

当我们将**handle()**包装在**CompletableFuture**中时，我们发现我们可以在**CompletableFuture**上添加操作来处理所包含的对象，事情变得更加有趣：

```java
// concurrent/CompletableApply.java
import java.util.concurrent.*;
public class CompletableApply {
    public static void main(String[] args) {
        CompletableFuture<Machina> cf =
        CompletableFuture.completedFuture(
            new Machina(0));
        CompletableFuture<Machina> cf2 =
            cf.thenApply(Machina::work);
        CompletableFuture<Machina> cf3 =
            cf2.thenApply(Machina::work);
        CompletableFuture<Machina> cf4 =
            cf3.thenApply(Machina::work);
        CompletableFuture<Machina> cf5 =
            cf4.thenApply(Machina::work);
    }
}
```

输出结果：

```
Machina0: ONE
Machina0: TWO
Machina0: THREE
Machina0: complete
```

**thenApply()**应用一个接受输入并产生输出的函数。在这种情况下，**work()**函数产生与它相同的类型，因此每个得到的**CompletableFuture**仍然被输入为**Machina**，但是（类似于**Streams**中的**map()**）**Function**也可以返回不同的类型，这将反映在返回类型

你可以在此处看到有关**CompletableFutures**的重要信息：它们会在你执行操作时自动解包并重新包装它们所携带的对象。这样你就不会陷入麻烦的细节，这使得编写和理解代码变得更加简单。

我们可以消除中间变量并将操作链接在一起，就像我们使用Streams一样：

```java
// concurrent/CompletableApplyChained.javaimport java.util.concurrent.*;
import onjava.Timer;
public class CompletableApplyChained {
    public static void main(String[] args) {
        Timer timer = new Timer();
        CompletableFuture<Machina> cf =
        CompletableFuture.completedFuture(
            new Machina(0))
                  .thenApply(Machina::work)
                  .thenApply(Machina::work)
                  .thenApply(Machina::work)
                  .thenApply(Machina::work);
        System.out.println(timer.duration());
    }
}
```

输出结果：

```
Machina0: ONE
Machina0: TWO
Machina0: THREE
Machina0: complete
514
```

在这里，我们还添加了一个**Timer**，它向我们展示每一步增加100毫秒，还有一些额外的开销。
**CompletableFutures**的一个重要好处是它们鼓励使用私有子类原则（不分享任何东西）。默认情况下，使用**thenApply()**来应用一个不与任何人通信的函数 - 它只需要一个参数并返回一个结果。这是函数式编程的基础，并且它在并发性方面非常有效[^5]。并行流和ComplempleFutures旨在支持这些原则。只要你不决定共享数据（共享非常容易，甚至意外）你可以编写相对安全的并发程序。

回调**thenApply()**开始一个操作，在这种情况下，在完成所有任务之前，不会完成**e CompletableFuture**的创建。虽然这有时很有用，但是启动所有任务通常更有价值，这样就可以运行时继续前进并执行其他操作。我们通过在操作结束时添加Async来实现此目的：

```java
// concurrent/CompletableApplyAsync.java
import java.util.concurrent.*;
import onjava.*;
public class CompletableApplyAsync {
    public static void main(String[] args) {
        Timer timer = new Timer();
        CompletableFuture<Machina> cf =
            CompletableFuture.completedFuture(
                new Machina(0))
                .thenApplyAsync(Machina::work)
                .thenApplyAsync(Machina::work)
                .thenApplyAsync(Machina::work)
                .thenApplyAsync(Machina::work);
            System.out.println(timer.duration());
            System.out.println(cf.join());
            System.out.println(timer.duration());
    }
}
```

输出结果：

```
116
Machina0: ONE
Machina0: TWO
Machina0:THREE
Machina0: complete
Machina0: complete
552
```

同步调用(我们通常使用得那种)意味着“当你完成工作时，返回”，而异步调用以意味着“立刻返回但是继续后台工作。”正如你所看到的，**cf**的创建现在发生得跟快。每次调用 **thenApplyAsync()** 都会立刻返回，因此可以进行下一次调用，整个链接序列的完成速度比以前快得快。

事实上，如果没有回调**cf.join() t**方法，程序会在完成其工作之前退出（尝试取出该行）对**join()**阻止了**main()**进程的进行，直到cf操作完成，我们可以看到大部分时间的确在哪里度过。

这种“立即返回”的异步能力需要**CompletableFuture**库进行一些秘密工作。特别是，它必须将你需要的操作链存储为一组回调。当第一个后台操作完成并返回时，第二个后台操作必须获取生成的**Machina**并开始工作，当完成后，下一个操作将接管，等等。但是没有我们普通的函数调用序列，通过程序调用栈控制，这个顺序会丢失，所以它使用回调 - 一个函数地址表来存储。

幸运的是，你需要了解有关回调的所有信息。程序员将你手工造成的混乱称为“回调地狱”。通过异步调用，**CompletableFuture**为你管理所有回调。除非你知道关于你的系统有什么特定的改变，否则你可能想要使用异步调用。

- 其他操作
  当你查看**CompletableFuture**的Javadoc时，你会看到它有很多方法，但这个方法的大部分来自不同操作的变体。例如，有**thenApply()**，**thenApplyAsync()**和**thenApplyAsync()**的第二种形式，它接受运行任务的**Executor**（在本书中我们忽略了**Executor**选项）。

这是一个显示所有“基本”操作的示例，它们不涉及组合两个CompletableFutures或异常（我们将在稍后查看）。首先，我们将重复使用两个实用程序以提供简洁和方便：

```java
// concurrent/CompletableUtilities.java
package onjava; import java.util.concurrent.*;
public class CompletableUtilities {
    // Get and show value stored in a CF:
    public static void showr(CompletableFuture<?> c) {
        try {
            System.out.println(c.get());
        } catch(InterruptedException
                | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
    // For CF operations that have no value:
    public static void voidr(CompletableFuture<Void> c) {
        try {
            c.get(); // Returns void
        } catch(InterruptedException
                | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
```

**showr()**在**CompletableFuture <Integer>**上调用**get()**并显示结果，捕获两个可能的异常。**voidr()**是**CompletableFuture <Void>**的**showr()**版本，即**CompletableFutures**，仅在任务完成或失败时显示。

为简单起见，以下**CompletableFutures**只包装整数。**cfi()**是一个方便的方法，它在完成的**CompletableFuture <Integer>**中包装一个**int**：

```java
// concurrent/CompletableOperations.java
import java.util.concurrent.*;
import static onjava.CompletableUtilities.*;
public class CompletableOperations {
    static CompletableFuture<Integer> cfi(int i) {
        return CompletableFuture.completedFuture( Integer.valueOf(i));
    }
    public static void main(String[] args) {
        showr(cfi(1)); // Basic test
        voidr(cfi(2).runAsync(() ->
            System.out.println("runAsync")));
        voidr(cfi(3).thenRunAsync(() ->
            System.out.println("thenRunAsync")));
        voidr(CompletableFuture.runAsync(() ->
            System.out.println("runAsync is static")));
        showr(CompletableFuture.supplyAsync(() -> 99));
        voidr(cfi(4).thenAcceptAsync(i ->
            System.out.println("thenAcceptAsync: " + i)));
        showr(cfi(5).thenApplyAsync(i -> i + 42));
        showr(cfi(6).thenComposeAsync(i -> cfi(i + 99)));
        CompletableFuture<Integer> c = cfi(7);
        c.obtrudeValue(111);
        showr(c);
        showr(cfi(8).toCompletableFuture());
        c = new CompletableFuture<>();
        c.complete(9);
        showr(c);
        c = new CompletableFuture<>();
        c.cancel(true);
        System.out.println("cancelled: " + c.isCancelled());
        System.out.println("completed exceptionally: " +
            c.isCompletedExceptionally());
        System.out.println("done: " + c.isDone());
        System.out.println(c);
        c = new CompletableFuture<>();
        System.out.println(c.getNow(777));
        c = new CompletableFuture<>();
        c.thenApplyAsync(i -> i + 42)
            .thenApplyAsync(i -> i * 12);
        System.out.println("dependents: " + c.getNumberOfDependents());
        c.thenApplyAsync(i -> i / 2);
        System.out.println("dependents: " + c.getNumberOfDependents());
    }
}
```

输出结果：

```
1
runAsync
thenRunAsync
runAsync is static
99
thenAcceptAsync: 4
47
105
111
8
9
cancelled: true
completed exceptionally: true
done: true
java.util.concurrent.CompletableFuture@6d311334[Complet ed exceptionally]
777
dependents: 1
dependents: 2
```

**main()**包含一系列可由其**int**值引用的测试。**cfi(1)**演示了**showr()**正常工作。**cfi(2)**是调用**runAsync()**的示例。由于**Runnable**不产生返回值，因此结果是**CompletableFuture <Void>**，因此使用**voidr()**。
注意使用**cfi(3)**,**thenRunAsync()**似乎与**runAsync()**一致，差异显示在后续的测试中：
**runAsync()**是一个静态方法，所以你不会像**cfi(2)**一样调用它。相反你可以在**QuittingCompletable.java**中使用它。后续测试中**supplyAsync()**也是静态方法，但是需要一个**Supplier**而不是**Runnable**并产生一个**CompletableFuture<Integer>**来代替**CompletableFuture<Void>**。
含有“then”的方法将进一步的操作应用于现有的**CompletableFuture <Integer>**。与**thenRunAsync()**不同的是，将**cfi(4)**，**cfi(5)**和**cfi(6)**的“ then”方法作为未包装的**Integer**的参数。如你通过使用**voidr()**所见，然后**AcceptAsync()**接受了一个**Consumer**，因此不会产生结果。**thenApplyAsync()**接受一个**Function**并因此产生一个结果（该结果的类型可以不同于其参数）。**thenComposeAsync()**与**thenApplyAsync()**非常相似，不同之处在于其Function必须产生已经包装在**CompletableFuture**中的结果。
**cfi(7)**示例演示了**obtrudeValue()**，它强制将值作为结果。**cfi(8)**使用**toCompletableFuture()**从**CompletionStage**生成**CompletableFuture**。**c.complete(9)**显示了如何通过给它一个结果来完成一个任务（**future**）（与**obtrudeValue()**相对，后者可能会迫使其结果替换该结果）。
如果你调用**CompletableFuture**中的**cancel()**方法，它也会完成并且是非常好的完成。
如果任务（**future**）未完成，则**getNow()**方法返回**CompletableFuture**的完成值，或者返回**getNow()**的替换参数。
最后，我们看一下依赖(dependents)的概念。如果我们将两个**thenApplyAsync()**调用链接到**CompletableFuture**上，则依赖项的数量仍为1。但是，如果我们将另一个**thenApplyAsync()**直接附加到**c**，则现在有两个依赖项：两个链和另一个链。这表明你可以拥有一个**CompletionStage**，当它完成时，可以根据其结果派生多个新任务。

### 结合CompletableFutures

第二类**CompletableFuture**方法采用两个**CompletableFuture**并以各种方式将它们组合在一起。一个**CompletableFuture**通常会先于另一个完成，就好像两者都在比赛中一样。这些方法使你可以以不同的方式处理结果。
为了对此进行测试，我们将创建一个任务，该任务将完成的时间作为其参数之一，因此我们可以控制。
**CompletableFuture**首先完成：

```java
// concurrent/Workable.java
import java.util.concurrent.*;
import onjava.Nap;
public class Workable {
    String id;
    final double duration;
    public Workable(String id, double duration) {
        this.id = id;
        this.duration = duration;
    }
    @Override
    public String toString() {
        return "Workable[" + id + "]";
    }
    public static Workable work(Workable tt) {
        new Nap(tt.duration); // Seconds
        tt.id = tt.id + "W";
        System.out.println(tt);
        return tt;
    }
    public static CompletableFuture<Workable> make(String id, double duration) {
        return CompletableFuture.completedFuture( new Workable(id, duration)) .thenApplyAsync(Workable::work);
    }
}
```

在**make()**中，**work()**方法应用于**CompletableFuture.work()**需要持续时间才能完成，然后将字母W附加到id上以指示工作已完成。
现在，我们可以创建多个竞争的**CompletableFuture**，并使用**CompletableFuture**库：

```java
// concurrent/DualCompletableOperations.java
import java.util.concurrent.*;
import static onjava.CompletableUtilities.*;
public class DualCompletableOperations {
    static CompletableFuture<Workable> cfA, cfB;
    static void init() {
        cfA = Workable.make("A", 0.15);
        cfB = Workable.make("B", 0.10);// Always wins
    }
    static void join() {
        cfA.join();
        cfB.join();
        System.out.println("*****************");
    }
    public static void main(String[] args) {
        init();
        voidr(cfA.runAfterEitherAsync(cfB, () -> System.out.println("runAfterEither")));
        join();
        init();
        voidr(cfA.runAfterBothAsync(cfB, () -> System.out.println("runAfterBoth")));
        join();
        init();
        showr(cfA.applyToEitherAsync(cfB, w -> {
            System.out.println("applyToEither: " + w);
            return w;
        }));
        join();
        init();
        voidr(cfA.acceptEitherAsync(cfB, w -> {
            System.out.println("acceptEither: " + w);
        }));
        join();
        init();
        voidr(cfA.thenAcceptBothAsync(cfB, (w1, w2) -> { System.out.println("thenAcceptBoth: " + w1 + ", " + w2);
        }));
        join();
        init();
        showr(cfA.thenCombineAsync(cfB, (w1, w2) -> {
            System.out.println("thenCombine: " + w1 + ", " + w2);
            return w1;
        }));
        join();
        init();
        CompletableFuture<Workable>
            cfC = Workable.make("C", 0.08),
            cfD = Workable.make("D", 0.09);
        CompletableFuture.anyOf(cfA, cfB, cfC, cfD)
        .thenRunAsync(() -> System.out.println("anyOf"));
        join();
        init();
        cfC = Workable.make("C", 0.08);
        cfD = Workable.make("D", 0.09);
        CompletableFuture.allOf(cfA, cfB, cfC, cfD)
        .thenRunAsync(() -> System.out.println("allOf"));
        join();
    }
}
```

输出结果：

```
Workable[BW]
runAfterEither
Workable[AW]
*****************
Workable[BW]
Workable[AW]
runAfterBoth
*****************
Workable[BW]
applyToEither: Workable[BW]
Workable[BW]
Workable[AW]
*****************
Workable[BW]
acceptEither: Workable[BW]
Workable[AW]
*****************
Workable[BW]
Workable[AW]
thenAcceptBoth: Workable[AW], Workable[BW]
****************
 Workable[BW]
 Workable[AW]
 thenCombine: Workable[AW], Workable[BW]
 Workable[AW]
 *****************
 Workable[CW]
 anyOf
 Workable[DW]
 Workable[BW]
 Workable[AW]
 *****************
 Workable[CW]
 Workable[DW]
 Workable[BW]
 Workable[AW]
 *****************
 allOf
```

为了便于访问，**cfA**和**cfB**是静态的。**init()**总是使用较短的延迟（因此总是“获胜”）使用“ B”初始化两者。**join()**是在这两种方法上调用**join()**并显示边框的另一种便捷方法。
所有这些“双重”方法都以一个**CompletableFuture**作为调用该方法的对象，第二个**CompletableFuture**作为第一个参数，然后是要执行的操作。
通过使用**Shower()**和**void()**，你可以看到“运行”和“接受”是终端操作，而“应用”和“组合”产生了新的承载载荷的**CompletableFutures**。

方法的名称是不言自明的，你可以通过查看输出来验证这一点。一个特别有趣的方法是CombineAsync()，它等待两个**CompletableFuture**完成，然后将它们都交给BiFunction，然后BiFunction可以将结果加入到所得**CompletableFuture**的有效负载中。

### 模拟

作为一个示例，说明如何使用**CompletableFutures**将一系列操作组合在一起，让我们模拟制作蛋糕的过程。在第一个阶段中，我们准备并将成分混合成面糊：

```java
// concurrent/Batter.java
import java.util.concurrent.*;
import onjava.Nap;
public class Batter {
    static class Eggs {}
    static class Milk {}
    static class Sugar {}
    static class Flour {}
    static <T> T prepare(T ingredient) {
        new Nap(0.1);
        return ingredient;
    }
    static <T> CompletableFuture<T> prep(T ingredient) {
        return CompletableFuture
                .completedFuture(ingredient)
                .thenApplyAsync(Batter::prepare);
    }
    public static CompletableFuture<Batter> mix() {
        CompletableFuture<Eggs> eggs = prep(new Eggs()); CompletableFuture<Milk> milk = prep(new Milk()); CompletableFuture<Sugar> sugar = prep(new Sugar()); CompletableFuture<Flour> flour = prep(new Flour()); CompletableFuture.allOf(eggs, milk, sugar, flour)
                        .join();
        new Nap(0.1); // Mixing time
        return CompletableFuture.completedFuture(new Batter());
    }
}

```

每种成分都需要一些时间来准备。**allOf()**等待所有配料准备就绪，然后需要更多时间将其混合到面糊中。

接下来，我们将单批面糊放入四个锅中进行烘烤。产品作为**CompletableFutures**流返回：

```java
// concurrent/Baked.java
import java.util.concurrent.*;
import java.util.stream.*;
import onjava.Nap;
public class Baked {
    static class Pan {}
    static Pan pan(Batter b) {
        new Nap(0.1);
        return new Pan();
    }
    static Baked heat(Pan p) {
        new Nap(0.1);
        return new Baked();
    }
    static CompletableFuture<Baked> bake(CompletableFuture<Batter> cfb){
        return cfb.thenApplyAsync(Baked::pan)
                    .thenApplyAsync(Baked::heat);
    }
    public static Stream<CompletableFuture<Baked>> batch() {
        CompletableFuture<Batter> batter = Batter.mix();
        return Stream.of(bake(batter), bake(batter), bake(batter), bake(batter));
    }
}
```

最后，我们创建了一批糖，并用它对蛋糕进行糖化：

```java
// concurrent/FrostedCake.java
import java.util.concurrent.*;
import java.util.stream.*;
import onjava.Nap;
final class Frosting {
    private Frosting() {}
    static CompletableFuture<Frosting> make() {
        new Nap(0.1);
        return CompletableFuture.completedFuture(new Frosting());
    }
}
public class FrostedCake {
    public FrostedCake(Baked baked, Frosting frosting) {
        new Nap(0.1);
    }
    @Override
    public String toString() {
        return "FrostedCake";
    }
    public static void main(String[] args) {
        Baked.batch()
            .forEach(baked -> baked.thenCombineAsync(Frosting.make(), (cake, frosting) -> new FrostedCake(cake, frosting)) .thenAcceptAsync(System.out::println)
            .join());
    }
}
```

一旦你对背后的想法感到满意。**CompletableFutures**它们相对易于使用。

### 例外情况

与**CompletableFutur**e在处理链中包装对象的方式相同，它还可以缓冲异常。这些不会在处理过程中显示给调用者，而只会在你尝试提取结果时显示。为了展示它们是如何工作的，我们将从创建一个在某些情况下引发异常的类开始：

```java
// concurrent/Breakable.java
import java.util.concurrent.*;
public class Breakable {
    String id;
    private int failcount;
    public Breakable(String id, int failcount) {
        this.id = id;
        this.failcount = failcount;
    }
    @Override
    public String toString() {
        return "Breakable_" + id + " [" + failcount + "]";
    }
    public static Breakable work(Breakable b) {
        if(--b.failcount == 0) {
            System.out.println( "Throwing Exception for " + b.id + "");
            throw new RuntimeException( "Breakable_" + b.id + " failed");
        }
        System.out.println(b);
        return b;
    }
}
```

**failcount**为正时，每次将对象传递给**work()**方法可减少**failcount**。当它为零时，**work()**会引发异常。如果你给它的**failcount**为零，则它永远不会引发异常。
请注意，它报告在抛出异常时抛出异常。
在下面的**test()**方法中，**work()**多次应用于**Breakable**，因此，如果**failcount**在范围内，则会引发异常。但是，在测试**A**到**E**中，你可以从输出中看到抛出了异常，但是它们从未出现：

```java
// concurrent/CompletableExceptions.java
import java.util.concurrent.*;
public class CompletableExceptions {
    static CompletableFuture<Breakable> test(String id, int failcount) {
        return
            CompletableFuture.completedFuture(
                new Breakable(id, failcount))
                .thenApply(Breakable::work)
                .thenApply(Breakable::work)
                .thenApply(Breakable::work)
                .thenApply(Breakable::work);
    }
    public static void main(String[] args) {
        // Exceptions don't appear ...
        test("A", 1);
        test("B", 2);
        test("C", 3);
        test("D", 4);
        test("E", 5);
        // ... until you try to fetch the value:
        try {
            test("F", 2).get(); // or join()
        } catch(Exception e) {
            System.out.println(e.getMessage());
        }
        // Test for exceptions:
        System.out.println(
            test("G", 2).isCompletedExceptionally());
        // Counts as "done":
        System.out.println(test("H", 2).isDone());
        // Force an exception:
        CompletableFuture<Integer> cfi =
            new CompletableFuture<>();
        System.out.println("done? " + cfi.isDone());
        cfi.completeExceptionally( new RuntimeException("forced"));
        try {
            cfi.get();
        } catch(Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```

输出结果：

```
Throwing Exception for A
Breakable_B [1]
Throwing Exception for B
Breakable_C [2]
Breakable_C [1]
Throwing Exception for C
Breakable_D [3]
Breakable_D [2]
Breakable_D [1]
Throwing Exception for D
Breakable_E [4]
Breakable_E [3]
Breakable_E [2]
Breakable_E [1]
Breakable_F [1]
Throwing Exception for F
java.lang.RuntimeException: Breakable_F failed
Breakable_G [1]
Throwing Exception for G
true
Breakable_H [1]
Throwing Exception for H
true
done? false
java.lang.RuntimeException: forced
```

测试**A**到**E**运行到抛出异常的地步，然后……什么都没有。只有在测试**F**中调用**get()**时，我们才能看到抛出的异常。
测试**G**显示，你可以首先检查在处理过程中是否引发了异常，而没有引发该异常。但是，测试H告诉我们，无论异常成功与否，异常仍然可以被视为“完成”
代码的最后一部分显示了如何在**CompletableFuture**中插入异常，而不管是否存在任何故障。
加入或获取结果时，我们不会使用粗略的try-catch，而是使用**CompletableFuture**提供的更复杂的机制来自动响应异常。你可以使用与所有**CompletableFuture**相同的表格来执行此操作：在链中插入**CompletableFuture**调用。有三个选项：**exclusively(**)，**handle()**和**whenComplete()**：

```java
// concurrent/CatchCompletableExceptions.java
import java.util.concurrent.*;
public class CatchCompletableExceptions {
    static void handleException(int failcount) {
        // Call the Function only if there's an
        // exception, must produce same type as came in: 
        CompletableExceptions
        .test("exceptionally", failcount)
        .exceptionally((ex) -> { // Function
            if(ex == null)
                System.out.println("I don't get it yet");
            return new Breakable(ex.getMessage(), 0);
        })
        .thenAccept(str ->
            System.out.println("result: " + str));
        // Create a new result (recover):
        CompletableExceptions
            .test("handle", failcount)
            .handle((result, fail) -> { // BiFunction
                if(fail != null)
                    return "Failure recovery object";
                else
                    return result + " is good"; })
            .thenAccept(str ->
                System.out.println("result: " + str));
        // Do something but pass the same result through: 
        CompletableExceptions
            .test("whenComplete", failcount)
            .whenComplete((result, fail) -> {// BiConsumer
                if(fail != null)
                    System.out.println("It failed");
                else
                    System.out.println(result + " OK");
            })
            .thenAccept(r ->
            System.out.println("result: " + r));
    }
    public static void main(String[] args) {
        System.out.println("**** Failure Mode ****");
        handleException(2);
        System.out.println("**** Success Mode ****");
        handleException(0);
    }
}
```

输出结果：

```
**** Failure Mode ****
Breakable_exceptionally [1]
Throwing Exception for exceptionally
result: Breakable_java.lang.RuntimeException:
Breakable_exceptionally failed [0]
Breakable_handle [1]
Throwing Exception for handle
result: Failure recovery object
Breakable_whenComplete [1]
Throwing Exception for whenComplete
It failed
**** Success Mode ****
Breakable_exceptionally [-1]
Breakable_exceptionally [-2]
Breakable_exceptionally [-3]
Breakable_exceptionally [-4]
result: Breakable_exceptionally [-4]
Breakable_handle [-1]
Breakable_handle [-2]
Breakable_handle [-3]
Breakable_handle [-4]
result: Breakable_handle [-4] is good
Breakable_whenComplete [-1]
Breakable_whenComplete [-2]
Breakable_whenComplete [-3]
Breakable_whenComplete [-4]
Breakable_whenComplete [-4] OK
result: Breakable_whenComplete [-4]
```

只有在有异常的情况下，**exclusively()**参数才会运行。**Exclusively()**的局限性在于，该函数只能返回输入的相同类型的值。**exclusively()**通过将一个好的对象重新插入流中而恢复到可行状态。
**handle()**始终被调用，你必须检查一下**fail**是否为**true**才能查看是否发生了异常。但是**handle()**可以产生任何新类型，因此它使你可以执行处理，而不仅可以像**exception()**那样进行恢复。
**whenComplete()**就像**handle()**一样，你必须测试是否失败，但是该参数是使用者，并且不会修改正在传递的结果对象。

### 流异常

通过修改**CompletableExceptions.java**，看看**CompletableFuture**异常与**Streams**异常有何不同：

```java
// concurrent/StreamExceptions.java
import java.util.concurrent.*;
import java.util.stream.*;
public class StreamExceptions {
    static Stream<Breakable> test(String id, int failcount) {
        return Stream.of(new Breakable(id, failcount)).
        map(Breakable::work)
        .map(Breakable::work
        .map(Breakable::work)
        .map(Breakable::work);
    }
    public static void main(String[] args) {
        // No operations are even applied ...
        test("A", 1);
        test("B", 2);
        Stream<Breakable> c = test("C", 3);
        test("D", 4);
        test("E", 5);
        // ... until there's a terminal operation:
        System.out.println("Entering try");
        try {
            c.forEach(System.out::println);// [1]
        } catch(Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```

输出结果：

```
Entering try
Breakable_C [2]
Breakable_C [1]
Throwing Exception for C
Breakable_C failed
```

使用**CompletableFutures**，我们看到了测试**A**到**E**的进展，但是使用**Streams**，直到你应用了终端操作(如[1]的**forEach()**)，一切都没有开始。**CompletableFuture**执行工作并捕获任何异常以供以后检索。比较这两者并不是一件容易的事，因为**Stream**没有终端操作根本无法执行任何操作，但是**Stream**绝对不会存储其异常。

### 检查异常

CompletableFutures和并行Streams都不支持包含已检查异常的操作。相反，你必须在调用操作时处理检查到的异常，这会产生不太优雅的代码：

```java
// concurrent/ThrowsChecked.java
import java.util.stream.*;
import java.util.concurrent.*;
public class ThrowsChecked {
    class Checked extends Exception {}
    static ThrowsChecked nochecked(ThrowsChecked tc) {
        return tc;
    }
    static ThrowsChecked withchecked(ThrowsChecked tc) throws Checked {
        return tc;
    }
    static void testStream() {
        Stream.of(new ThrowsChecked())
            .map(ThrowsChecked::nochecked)
            // .map(ThrowsChecked::withchecked); // [1]
            .map(tc -> {
                try {
                    return withchecked(tc);
                } catch(Checked e) {
                    throw new RuntimeException(e);
                }
            });
    }
    static void testCompletableFuture() {
        CompletableFuture .completedFuture(new ThrowsChecked())
            .thenApply(ThrowsChecked::nochecked)
            // .thenApply(ThrowsChecked::withchecked); // [2]
            .thenApply(tc -> {
                try {
                    return withchecked(tc);
                } catch(Checked e) {
                    throw new RuntimeException(e);
                }
            });
    }
}
```

如果你尝试像对 **nochecked()** 一样对 **withchecked()** 使用方法引用，则编译器会抱怨[1]和[2]。相反，你必须写出lambda表达式（或编写一个不会引发异常的包装器方法）。
<!-- Deadlock -->

## 死锁

由于任务可能会被阻塞，因此一个任务有可能卡在等待另一个任务上，而任务又在等待另一个任务，依此类推，直到链回到第一个任务上。你会遇到一个不断循环的任务，彼此等待，没有人能动。这称为死锁[^6]
如果你尝试运行某个程序并立即陷入死锁，则可以立即查找该错误。真正的问题是，当你的程序看起来运行良好，但具有隐藏潜力死锁。在这里，你可能没有任何迹象表明可能发生死锁，因此该缺陷在你的程序中是潜在的，直到它意外发生为止（通常是对客户而言（几乎肯定很难复制））。因此，通过仔细的程序设计防止死锁是开发并发系统的关键部分。
埃德斯·迪克斯特拉（Essger Dijkstra）发明的"哲学家进餐"问题是经典的死锁例证。基本描述指定了五位哲学家（此处显示的示例允许任何数字）。这些哲学家将一部分时间花在思考上，一部分时间在吃饭上。他们在思考的时候并不需要任何共享资源，但是他们使用的餐具数量有限。在最初的问题描述中，器物是叉子，需要两个叉子才能从桌子中间的碗里取出意大利面。常见的版本是使用筷子。显然，每个哲学家都需要两个筷子才能吃饭。
引入了一个困难：作为哲学家，他们的钱很少，所以他们只能买五根筷子（更普遍地说，筷子的数量与哲学家相同）。它们之间围绕桌子隔开。当一个哲学家想要吃饭时，该哲学家必须拿起左边和右边的筷子。如果任一侧的哲学家都在使用所需的筷子，则我们的哲学家必须等待，直到必要的筷子可用为止。
**StickHolder**类通过将单个筷子保持在大小为1的**BlockingQueue**中来管理它。**BlockingQueue**是一个设计用于在并发程序中安全使用的集合，如果你调用take()并且队列为空，则它将阻塞（等待）。将新元素放入队列后，将释放该块并返回该值：

```java
// concurrent/StickHolder.java
import java.util.concurrent.*;
public class StickHolder {
    private static class Chopstick {}
    private Chopstick stick = new Chopstick();
    private BlockingQueue<Chopstick> holder = new ArrayBlockingQueue<>(1);
    public StickHolder() {
        putDown();
    }
    public void pickUp() {
        try {
            holder.take();// Blocks if unavailable
        } catch(InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
    public void putDown() {
        try {
            holder.put(stick);
        } catch(InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
```

为简单起见，**StickHolder**从未真正制作过**Chopstick**，而是在类中将其保密。如果调用**pickUp()**而该筷子不可用，则**pickUp()**会阻塞，直到另一位调用**putDown()**的哲学家返回了该摇杆。请注意，此类中的所有线程安全性都是通过**BlockingQueue**实现的。

每个哲学家都是一个任务，尝试将左右两把筷子都拿起，使其可以进食，然后使用**putDown()**释放这些筷子:

```java
// concurrent/Philosopher.java
public class Philosopher implements Runnable {
    private final int seat;
    private final StickHolder left, right;
    public Philosopher(int seat, StickHolder left, StickHolder right) {
        this.seat = seat;
        this.left = left;
        this.right = right;
    }
    @Override
    public String toString() {
        return "P" + seat;
    }
    @Override
    public void run() {
        while(true) {
            // System.out.println("Thinking");
            // [1] right.pickUp();
            left.pickUp();
            System.out.println(this + " eating");
            right.putDown();
            left.putDown();
        }
    }
}
```

没有两个哲学家可以同时成功调用take()同一只筷子。另外，如果一个哲学家已经拿过筷子，那么下一个试图拿起同一根筷子的哲学家将阻塞，等待其被释放。
结果是一个看似无辜的程序陷入了死锁。我在这里使用数组而不是集合，只是因为结果语法更简洁：

```java
// concurrent/DiningPhilosophers.java
// Hidden deadlock
// {ExcludeFromGradle} Gradle has trouble
import java.util.*;
import java.util.concurrent.*;
import onjava.Nap;
public class DiningPhilosophers {
    private StickHolder[] sticks;
    private Philosopher[] philosophers;
    public DiningPhilosophers(int n) {
        sticks = new StickHolder[n];
        Arrays.setAll(sticks, i -> new StickHolder());
        philosophers = new Philosopher[n];
        Arrays.setAll(philosophers,
            i -> new Philosopher(i, sticks[i], sticks[(i + 1) % n]));// [1]
        // Fix by reversing stick order for this one:
        // philosophers[1] = // [2]
        // new Philosopher(0, sticks[0], sticks[1]);
        Arrays.stream(philosophers)
            .forEach(CompletableFuture::runAsync);// [3]
    }
    public static void main(String[] args) {
        // Returns right away:
        new DiningPhilosophers(5);// [4]
        // Keeps main() from exiting:
        new Nap(3, "Shutdown");
    }
}
```

当你停止查看输出时，该程序将死锁。但是，根据你的计算机配置，你可能不会看到死锁。看来这取决于计算机上的内核数[^7]。两个核心似乎不会产生死锁，但似乎有两个以上的核心很容易产生死锁。此行为使该示例更好地说明了死锁，因为你可能正在具有两个内核的计算机上编写程序（如果确实是导致问题的原因），并且确信该程序可以正常工作，只能启动它将其安装在另一台计算机上时出现死锁。请注意，仅仅因为你不容易看到死锁，并不意味着该程序就不会在两核计算机上死锁。该程序仍然容易死锁，很少发生-可以说是最坏的情况，因为问题不容易解决。
在DiningPhilosophers构造函数中，每个哲学家都获得一个左右StickHolder的引用。除最后一个哲学家外，每个哲学家都通过以下方式初始化：
哲学家之间的下一双筷子。最后一位哲学家右手的筷子为零，因此圆桌会议完成了。那是因为最后一位哲学家正坐在第一个哲学家的旁边，而且他们俩都共用零筷子。[1]显示了以n为模数选择的右摇杆，将最后一个哲学家缠绕在第一个哲学家的旁边。
现在，所有哲学家都可以尝试吃饭，每个哲学家都在旁边等待哲学家放下筷子。
要开始在[3]上运行的每个Philosopher，我调用runAsync（），这意味着DiningPhilosophers构造函数立即在[4]处返回。没有任何东西可以阻止main（）完成，该程序只是退出而无济于事。Nap对象阻止main（）退出，然后在三秒钟后强制退出（可能是）死锁的程序。
在给定的配置中，哲学家几乎没有时间思考。因此，他们都在尝试吃饭时争夺筷子，而且僵局往往很快发生。你可以更改此：

1. 通过增加[4]的值来添加更多哲学家。
2. 在Philosopher.java中取消注释行[1]。

任一种方法都会减少死锁的可能性，这表明编写并发程序并认为它是安全的危险，因为它似乎“在我的机器上运行正常”。你可以轻松地说服自己该程序没有死锁，即使它不是。这个例子很有趣，因为它演示了程序似乎可以正确运行，同时仍然容易出现死锁。
为了解决该问题，我们观察到当四个同时满足条件：

1. 互斥。任务使用的至少一种资源必须不可共享。在这里，筷子一次只能由一位哲学家使用。
2. 至少一个任务必须拥有资源，并等待获取当前由另一任务拥有的资源。也就是说，要使僵局发生，哲学家必须握住一根筷子，等待另一根筷子。
3. 不能抢先从任务中夺走资源。任务仅作为正常事件释放资源。我们的哲学家很有礼貌，他们不会抓住其他哲学家的筷子。
4. 可能发生循环等待，即一个任务等待另一个任务持有的资源，而该任务又等待另一个任务持有的资源，依此类推，直到一个任务正在等待另一个任务持有的资源。第一项任务，从而使一切陷入僵局。在**DiningPhilosophers.java**中，发生循环等待是因为每个哲学家都先尝试获取右筷子，然后再获取左筷子。

因为必须满足所有这些条件才能导致死锁，所以你只能阻止其中一个解除死锁。在此程序中，防止死锁的一种简单方法是打破第四个条件。之所以会发生这种情况，是因为每个哲学家都尝试按照特定的顺序拾起自己的筷子：先右后左。因此，每个哲学家都有可能在等待左手的同时握住右手的筷子，从而导致循环等待状态。但是，如果其中一位哲学家尝试首先拿起左筷子，则该哲学家决不会阻止紧邻右方的哲学家拿起筷子，从而排除了循环等待。
在**DiningPhilosophers.java**中，取消注释[1]和其后的一行。这将原来的哲学家[1]替换为筷子颠倒的哲学家。通过确保第二位哲学家拾起并在右手之前放下左筷子，我们消除了死锁的可能性。
这只是解决问题的一种方法。你也可以通过防止其他情况之一来解决它。
没有语言支持可以帮助防止死锁；你有责任通过精心设计来避免这种情况。对于试图调试死锁程序的人来说，这些都不是安慰。当然，避免并发问题的最简单，最好的方法是永远不要共享资源-不幸的是，这并不总是可能的。



<!-- Constructors are not Thread-Safe -->

## 构造函数非线程安全

当你在脑子里想象一个对象构造的过程，你会很容易认为这个过程是线程安全的。毕竟，在对象初始化完成前对外不可见，所以又怎会对此产生争议呢？确实，[Java 语言规范](https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.8.3) (JLS)自信满满地陈述道：“*没必要使构造器的线程同步，因为它会锁定正在构造的对象，直到构造器完成初始化后才对其他线程可见。*”
不幸的是，对象的构造过程如其他操作一样，也会受到共享内存并发问题的影响，只是作用机制可能更微妙罢了。

设想下使用一个**静态**字段为每个对象自动创建唯一标识符的过程。为了测试其不同的实现过程，我们从一个接口开始。代码示例：

```java
//concurrent/HasID.java
public interface HasID {
    int getID();
}
```

然后 **StaticIDField** 类显式地实现该接口。代码示例：

```java
// concurrent/StaticIDField.java
public class StaticIDField implements HasID {
    private static int counter = 0;
    private int id = counter++;
    public int getID() { return id; }
}
```

如你所想，该类是个简单无害的类，它甚至都没一个显式的构造器来引发问题。当我们运行多个用于创建此类对象的线程时，究竟会发生什么？为了搞清楚这点，我们做了以下测试。代码示例：

```java
// concurrent/IDChecker.java
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
import java.util.concurrent.*;
import com.google.common.collect.Sets;
public class IDChecker {
    public static final int SIZE = 100_000;

    static class MakeObjects implements
        Supplier<List<Integer>> {
        private Supplier<HasID> gen;

        MakeObjects(Supplier<HasID> gen) {
            this.gen = gen;
        }

        @Override public List<Integer> get() {
            return Stream.generate(gen)
            .limit(SIZE)
            .map(HasID::getID)
            .collect(Collectors.toList());
        }
    }

    public static void test(Supplier<HasID> gen) {
        CompletableFuture<List<Integer>>
        groupA = CompletableFuture.supplyAsync(new
            MakeObjects(gen)),
        groupB = CompletableFuture.supplyAsync(new
            MakeObjects(gen));

        groupA.thenAcceptBoth(groupB, (a, b) -> {
            System.out.println(
                Sets.intersection(
                Sets.newHashSet(a),
                Sets.newHashSet(b)).size());
            }).join();
    }
}
```

**MakeObjects** 类是一个生产者类，包含一个能够产生 List\<Integer> 类型的列表对象的 `get()` 方法。通过从每个 `HasID` 对象提取 `ID` 并放入列表中来生成这个列表对象，而 `test()` 方法则创建了两个并行的 **CompletableFuture** 对象，用于运行 **MakeObjects** 生产者类，然后获取运行结果。
使用 Guava 库中的 **Sets.**`intersection()` 方法，计算出这两个返回的 List\<Integer> 对象中有多少相同的 `ID`（使用谷歌 Guava 库里的方法比使用官方的 `retainAll()` 方法速度快得多）。

现在我们可以测试上面的 **StaticIDField** 类了。代码示例：

```java
// concurrent/TestStaticIDField.java
public class TestStaticIDField {

    public static void main(String[] args) {
        IDChecker.test(StaticIDField::new);
    }
}
```

输出结果：

```
    13287
```

结果中出现了很多重复项。很显然，纯静态 `int` 用于构造过程并不是线程安全的。让我们使用 **AtomicInteger** 来使其变为线程安全的。代码示例：

```java
// concurrent/GuardedIDField.java
import java.util.concurrent.atomic.*;
public class GuardedIDField implements HasID {  
    private static AtomicInteger counter = new
        AtomicInteger();

    private int id = counter.getAndIncrement();

    public int getID() { return id; }

    public static void main(String[] args) {                IDChecker.test(GuardedIDField::new);
    }
}
```

输出结果：

```
    0
```

构造器有一种更微妙的状态共享方式：通过构造器参数：

```java
// concurrent/SharedConstructorArgument.java
import java.util.concurrent.atomic.*;
interface SharedArg{
    int get();
}

class Unsafe implements SharedArg{
    private int i = 0;

    public int get(){
        return i++;
    }
}

class Safe implements SharedArg{
    private static AtomicInteger counter = new AtomicInteger();

    public int get(){
        return counter.getAndIncrement();
    }
}

class SharedUser implements HasID{
    private final int id;

    SharedUser(SharedArg sa){
        id = sa.get();
    }

    @Override
    public int getID(){
        return id;
    }
}

public class SharedConstructorArgument{
    public static void main(String[] args){
        Unsafe unsafe = new Unsafe();
        IDChecker.test(() -> new SharedUser(unsafe));

        Safe safe = new Safe();
        IDChecker.test(() -> new SharedUser(safe));
    }
}
```

输出结果：

```
    24838
    0
```

在这里，**SharedUser** 构造器实际上共享了相同的参数。即使 **SharedUser** 以完全无害且合理的方式使用其自己的参数，其构造器的调用方式也会引起冲突。**SharedUser** 甚至不知道它是以这种方式调用的，更不必说控制它了。
同步构造器并不被java语言所支持，但是通过使用同步语块来创建你自己的同步构造器是可能的（请参阅附录：[并发底层原理](./Appendix-Low-Level-Concurrency.md)，来进一步了解同步关键字—— `synchronized`）。尽管JLS（java语言规范）这样陈述道：“……它会锁定正在构造的对象”，但这并不是真的——构造器实际上只是一个静态方法，因此同步构造器实际上会锁定该类的Class对象。我们可以通过创建自己的静态对象并锁定它，来达到与同步构造器相同的效果：

```java
// concurrent/SynchronizedConstructor.java

import java.util.concurrent.atomic.*;

class SyncConstructor implements HasID{
    private final int id;
    private static Object constructorLock =
        new Object();

    SyncConstructor(SharedArg sa){
        synchronized (constructorLock){
            id = sa.get();
        }
    }

    @Override
    public int getID(){
        return id;
    }
}

public class SynchronizedConstructor{
    public static void main(String[] args){
        Unsafe unsafe = new Unsafe();
        IDChecker.test(() -> new SyncConstructor(unsafe));
    }
}
```

输出结果：

```
    0
```

**Unsafe**类的共享使用现在就变得安全了。另一种方法是将构造器设为私有（因此可以防止继承），并提供一个静态Factory方法来生成新对象：

```java
// concurrent/SynchronizedFactory.java
import java.util.concurrent.atomic.*;

final class SyncFactory implements HasID{
    private final int id;

    private SyncFactory(SharedArg sa){
        id = sa.get();
    }

    @Override
    public int getID(){
        return id;
    }

    public static synchronized SyncFactory factory(SharedArg sa){
        return new SyncFactory(sa);
    }
}

public class SynchronizedFactory{
    public static void main(String[] args){
        Unsafe unsafe = new Unsafe();
        IDChecker.test(() -> SyncFactory.factory(unsafe));
    }
}
```

输出结果：

```
    0
```

通过同步静态工厂方法，可以在构造过程中锁定 **Class** 对象。
这些示例充分表明了在并发Java程序中检测和管理共享状态有多困难。即使你采取“不共享任何内容”的策略，也很容易产生意外的共享事件。
<!-- Effort, Complexity,Cost -->

## 复杂性和代价

假设你正在做披萨，我们把从整个流程的当前步骤到下一个步骤所需的工作量，在这里一一表示为枚举变量的一部分：



```java
// concurrent/Pizza.java import java.util.function.*;

import onjava.Nap;
public class Pizza{
    public enum Step{
        DOUGH(4), ROLLED(1), SAUCED(1), CHEESED(2),
        TOPPED(5), BAKED(2), SLICED(1), BOXED(0);
        int effort;// Needed to get to the next step 

        Step(int effort){
            this.effort = effort;
        }

        Step forward(){
            if (equals(BOXED)) return BOXED;
            new Nap(effort * 0.1);
            return values()[ordinal() + 1];
        }
    }

    private Step step = Step.DOUGH;
    private final int id;

    public Pizza(int id){
        this.id = id;
    }

    public Pizza next(){
        step = step.forward();
        System.out.println("Pizza " + id + ": " + step);
        return this;
    }

    public Pizza next(Step previousStep){
        if (!step.equals(previousStep))
            throw new IllegalStateException("Expected " +
                      previousStep + " but found " + step);
        return next();
    }

    public Pizza roll(){
        return next(Step.DOUGH);
    }

    public Pizza sauce(){
        return next(Step.ROLLED);
    }

    public Pizza cheese(){
        return next(Step.SAUCED);
    }

    public Pizza toppings(){
        return next(Step.CHEESED);
    }

    public Pizza bake(){
        return next(Step.TOPPED);
    }

    public Pizza slice(){
        return next(Step.BAKED);
    }

    public Pizza box(){
        return next(Step.SLICED);
    }

    public boolean complete(){
        return step.equals(Step.BOXED);
    }

    @Override
    public String toString(){
        return "Pizza" + id + ": " + (step.equals(Step.BOXED) ? "complete" : step);
    }
}
```

这只算得上是一个平凡的状态机，就像**Machina**类一样。

制作一个披萨，当披萨饼最终被放在盒子中时，就算完成最终任务了。 如果一个人在做一个披萨饼，那么所有步骤都是线性进行的，即一个接一个地进行：

```java
// concurrent/OnePizza.java 

import onjava.Timer;

public class OnePizza{
    public static void main(String[] args){
        Pizza za = new Pizza(0);
        System.out.println(Timer.duration(() -> {
            while (!za.complete()) za.next();
        }));
    }
}
```

输出结果：

```
Pizza 0: ROLLED 
Pizza 0: SAUCED 
Pizza 0: CHEESED 
Pizza 0: TOPPED 
Pizza 0: BAKED 
Pizza 0: SLICED 
Pizza 0: BOXED 
	1622 
```

时间以毫秒为单位，加总所有步骤的工作量，会得出与我们的期望值相符的数字。 如果你以这种方式制作了五个披萨，那么你会认为它花费的时间是原来的五倍。 但是，如果这还不够快怎么办？ 我们可以从尝试并行流方法开始：

```java
// concurrent/PizzaStreams.java
// import java.util.*; import java.util.stream.*;

import onjava.Timer;

public class PizzaStreams{
    static final int QUANTITY = 5;

    public static void main(String[] args){
        Timer timer = new Timer();
        IntStream.range(0, QUANTITY)
            .mapToObj(Pizza::new)
            .parallel()//[1]
        	.forEach(za -> { while(!za.complete()) za.next(); }); 			System.out.println(timer.duration());
    }
}
```

输出结果：

```
Pizza 2: ROLLED
Pizza 0: ROLLED
Pizza 1: ROLLED
Pizza 4: ROLLED
Pizza 3:ROLLED
Pizza 2:SAUCED
Pizza 1:SAUCED
Pizza 0:SAUCED
Pizza 4:SAUCED
Pizza 3:SAUCED
Pizza 2:CHEESED
Pizza 1:CHEESED
Pizza 0:CHEESED
Pizza 4:CHEESED
Pizza 3:CHEESED
Pizza 2:TOPPED
Pizza 1:TOPPED
Pizza 0:TOPPED
Pizza 4:TOPPED
Pizza 3:TOPPED
Pizza 2:BAKED
Pizza 1:BAKED
Pizza 0:BAKED
Pizza 4:BAKED
Pizza 3:BAKED
Pizza 2:SLICED
Pizza 1:SLICED
Pizza 0:SLICED
Pizza 4:SLICED
Pizza 3:SLICED
Pizza 2:BOXED
Pizza 1:BOXED
Pizza 0:BOXED
Pizza 4:BOXED
Pizza 3:BOXED
1739
```

现在，我们制作五个披萨的时间与制作单个披萨的时间就差不多了。 尝试删除标记为[1]的行后，你会发现它花费的时间是原来的五倍。 你还可以尝试将**QUANTITY**更改为4、8、10、16和17，看看会有什么不同，并猜猜看为什么会这样。

**PizzaStreams** 类产生的每个并行流在它的`forEach()`内完成所有工作，如果我们将其各个步骤用映射的方式一步一步处理，情况会有所不同吗？

```java
// concurrent/PizzaParallelSteps.java 

import java.util.*;
import java.util.stream.*;
import onjava.Timer;

public class PizzaParallelSteps{
    static final int QUANTITY = 5;

    public static void main(String[] args){
        Timer timer = new Timer();
        IntStream.range(0, QUANTITY)
            .mapToObj(Pizza::new)
            .parallel()
            .map(Pizza::roll)
            .map(Pizza::sauce)
            .map(Pizza::cheese)
            .map(Pizza::toppings)
            .map(Pizza::bake)
            .map(Pizza::slice)
            .map(Pizza::box)
            .forEach(za -> System.out.println(za));
        System.out.println(timer.duration());
    }
} 
```

输出结果：

```
Pizza 2: ROLLED 
Pizza 0: ROLLED 
Pizza 1: ROLLED 
Pizza 4: ROLLED 
Pizza 3: ROLLED 
Pizza 1: SAUCED 
Pizza 0: SAUCED 
Pizza 2: SAUCED 
Pizza 3: SAUCED 
Pizza 4: SAUCED 
Pizza 1: CHEESED 
Pizza 0: CHEESED 
Pizza 2: CHEESED 
Pizza 3: CHEESED 
Pizza 4: CHEESED 
Pizza 0: TOPPED 
Pizza 2: TOPPED
Pizza 1: TOPPED 
Pizza 3: TOPPED 
Pizza 4: TOPPED 
Pizza 1: BAKED 
Pizza 2: BAKED 
Pizza 0: BAKED 
Pizza 4: BAKED 
Pizza 3: BAKED 
Pizza 0: SLICED 
Pizza 2: SLICED 
Pizza 1: SLICED 
Pizza 3: SLICED 
Pizza 4: SLICED 
Pizza 1: BOXED 
Pizza1: complete 
Pizza 2: BOXED 
Pizza 0: BOXED 
Pizza2: complete 
Pizza0: complete 
Pizza 3: BOXED
Pizza 4: BOXED 
Pizza4: complete 
Pizza3: complete 
1738 
```

答案是“否”，事后看来这并不奇怪，因为每个披萨都需要按顺序执行步骤。因此，没法通过分步执行操作来进一步提高速度，就像上文的 `PizzaParallelSteps.java` 里面展示的一样。

我们可以使用 **CompletableFutures** 重写这个例子：

```java
// concurrent/CompletablePizza.java 

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.*;
import onjava.Timer;

public class CompletablePizza{
    static final int QUANTITY = 5;

    public static CompletableFuture<Pizza> makeCF(Pizza za){
        return CompletableFuture
                .completedFuture(za)
            .thenApplyAsync(Pizza::roll)
            .thenApplyAsync(Pizza::sauce)
            .thenApplyAsync(Pizza::cheese)
            .thenApplyAsync(Pizza::toppings)
            .thenApplyAsync(Pizza::bake)
            .thenApplyAsync(Pizza::slice)
            .thenApplyAsync(Pizza::box);
    }

    public static void show(CompletableFuture<Pizza> cf){
        try{
            System.out.println(cf.get());
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args){
        Timer timer = new Timer();
        List<CompletableFuture<Pizza>> pizzas =
                IntStream.range(0, QUANTITY)
            .mapToObj(Pizza::new)
            .map(CompletablePizza::makeCF)
            .collect(Collectors.toList());
        System.out.println(timer.duration());
        pizzas.forEach(CompletablePizza::show);
        System.out.println(timer.duration());
    }
}
```

输出结果：

```
169 
Pizza 0: ROLLED 
Pizza 1: ROLLED 
Pizza 2: ROLLED 
Pizza 4: ROLLED 
Pizza 3: ROLLED 
Pizza 1: SAUCED 
Pizza 0: SAUCED 
Pizza 2: SAUCED 
Pizza 4: SAUCED
Pizza 3: SAUCED 
Pizza 0: CHEESED 
Pizza 4: CHEESED 
Pizza 1: CHEESED 
Pizza 2: CHEESED 
Pizza 3: CHEESED 
Pizza 0: TOPPED 
Pizza 4: TOPPED 
Pizza 1: TOPPED 
Pizza 2: TOPPED 
Pizza 3: TOPPED 
Pizza 0: BAKED 
Pizza 4: BAKED 
Pizza 1: BAKED 
Pizza 3: BAKED 
Pizza 2: BAKED 
Pizza 0: SLICED 
Pizza 4: SLICED 
Pizza 1: SLICED 
Pizza 3: SLICED
Pizza 2: SLICED 
Pizza 4: BOXED 
Pizza 0: BOXED 
Pizza0: complete 
Pizza 1: BOXED 
Pizza1: complete 
Pizza 3: BOXED 
Pizza 2: BOXED 
Pizza2: complete 
Pizza3: complete 
Pizza4: complete 
1797 
```

并行流和 **CompletableFutures** 是 Java 并发工具箱中最先进发达的技术。 你应该始终首先选择其中之一。 当一个问题很容易并行处理时，或者说，很容易把数据分解成相同的、易于处理的各个部分时，使用并行流方法处理最为合适（而如果你决定不借助它而由自己完成，你就必须撸起袖子，深入研究**Spliterator**的文档）。

而当工作的各个部分内容各不相同时，使用 **CompletableFutures** 是最好的选择。比起面向数据，**CompletableFutures** 更像是面向任务的。

对于披萨问题，结果似乎也没有什么不同。实际上，并行流方法看起来更简洁，仅出于这个原因，我认为并行流作为解决问题的首次尝试方法更具吸引力。

由于制作披萨总需要一定的时间，无论你使用哪种并发方法，你能做到的最好情况，是在制作一个披萨的相同时间内制作n个披萨。 在这里当然很容易看出来，但是当你处理更复杂的问题时，你就可能忘记这一点。 通常，在项目开始时进行粗略的计算，就能很快弄清楚最大可能的并行吞吐量，这可以防止你因为采取无用的加快运行速度的举措而忙得团团转。

使用 **CompletableFutures** 或许可以轻易地带来重大收益，但是在尝试更进一步时需要倍加小心，因为额外增加的成本和工作量会非常容易远远超出你之前拼命挤出的那一点点收益。

<!-- Summary -->

## 本章小结

需要并发的唯一理由是“等待太多”。这也可以包括用户界面的响应速度，但是由于Java用于构建用户界面时并不高效，因此[^8]这仅仅意味着“你的程序运行速度还不够快”。

如果并发很容易，则没有理由拒绝并发。 正因为并发实际上很难，所以你应该仔细考虑是否值得为此付出努力，并考虑你能否以其他方式提升速度。

例如，迁移到更快的硬件（这可能比消耗程序员的时间要便宜得多）或者将程序分解成多个部分，然后在不同的机器上运行这些部分。

奥卡姆剃刀是一个经常被误解的原则。 我看过至少一部电影，他们将其定义为”最简单的解决方案是正确的解决方案“，就好像这是某种毋庸置疑的法律。实际上，这是一个准则：面对多种方法时，请先尝试需要最少假设的方法。 在编程世界中，这已演变为“尝试可能可行的最简单的方法”。当你了解了特定工具的知识时——就像你现在了解了有关并发性的知识一样，你可能会很想使用它，或者提前规定你的解决方案必须能够“速度飞快”，从而来证明从一开始就进行并发设计是合理的。但是，我们的奥卡姆剃刀编程版本表示你应该首先尝试最简单的方法（这种方法开发起来也更便宜），然后看看它是否足够好。

由于我出身于底层学术背景（物理学和计算机工程），所以我很容易想到所有小轮子转动的成本。我确定使用最简单的方法不够快的场景出现的次数已经数不过来了，但是尝试后却发现它实际上绰绰有余。

### 缺点

并发编程的主要缺点是：

1. 在线程等待共享资源时会降低速度。

2. 线程管理产生额外CPU开销。

3. 糟糕的设计决策带来无法弥补的复杂性。

4. 诸如饥饿，竞速，死锁和活锁（多线程各自处理单个任务而整体却无法完成）之类的问题。

5. 跨平台的不一致。 通过一些示例，我发现了某些计算机上很快出现的竞争状况，而在其他计算机上却没有。 如果你在后者上开发程序，则在分发程序时可能会感到非常惊讶。



另外，并发的应用是一门艺术。 Java旨在允许你创建尽可能多的所需要的对象来解决问题——至少在理论上是这样。[^9]但是，线程不是典型的对象：每个线程都有其自己的执行环境，包括堆栈和其他必要的元素，使其比普通对象大得多。 在大多数环境中，只能在内存用光之前创建数千个**Thread**对象。通常，你只需要几个线程即可解决问题，因此一般来说创建线程没有什么限制，但是对于某些设计而言，它会成为一种约束，可能迫使你使用完全不同的方案。

### 共享内存陷阱

并发性的主要困难之一是因为可能有多个任务共享一个资源（例如对象中的内存），并且你必须确保多个任务不会同时读取和更改该资源。

我花了多年的时间研究并发并发。 我了解到你永远无法相信使用共享内存并发的程序可以正常工作。 你可以轻易发现它是错误的，但永远无法证明它是正确的。 这是众所周知的并发原则之一。[^10]

我遇到了许多人，他们对编写正确的线程程序的能力充满信心。 我偶尔开始认为我也可以做好。 对于一个特定的程序，我最初是在只有单个CPU的机器上编写的。 那时我能够说服自己该程序是正确的，因为我以为我对Java工具很了解。 而且在我的单CPU计算机上也没有失败。而到了具有多个CPU的计算机，程序出现问题不能运行后，我感到很惊讶，但这还只是众多问题中的一个而已。 这不是Java的错； “写一次，到处运行”，在单核与多核计算机间无法扩展到并发编程领域。这是并发编程的基本问题。 实际上你可以在单CPU机器上发现一些并发问题，但是在多线程实际上真的在并行运行的多CPU机器上，就会出现一些其他问题。

再举一个例子，哲学家就餐的问题可以很容易地进行调整，因此几乎不会产生死锁，这会给你一种一切都棒极了的印象。当涉及到共享内存并发编程时，你永远不应该对自己的编程能力变得过于自信。



### This Albatross is Big

如果你对Java并发感到不知所措，那说明你身处在一家出色的公司里。你 可以访问**Thread**类的[Javadoc](https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.html)页面， 看一下哪些方法现在是**Deprecated**（废弃的）。这些是Java语言设计者犯过错的地方，因为他们在设计语言时对并发性了解不足。

事实证明，在Java的后续版本中添加的许多库解决方案都是无效的，甚至是无用的。 幸运的是，Java 8中的并行**Streams**和**CompletableFutures**都非常有价值。但是当你使用旧代码时，仍然会遇到旧的解决方案。

在本书的其他地方，我谈到了Java的一个基本问题：每个失败的实验都永远嵌入在语言或库中。 Java并发强调了这个问题。尽管有不少错误，但错误并不是那么多，因为有很多不同的尝试方法来解决问题。 好的方面是，这些尝试产生了更好，更简单的设计。 不利之处在于，在找到好的方法之前，你很容易迷失于旧的设计中。

### 其他类库

本章重点介绍了相对安全易用的并行工具流和**CompletableFutures**，并且仅涉及Java标准库中一些更细粒度的工具。 为避免你不知所措，我没有介绍你可能实际在实践中使用的某些库。我们使用了几个**Atomic**（原子）类，**ConcurrentLinkedDeque**，**ExecutorService**和**ArrayBlockingQueue**。附录：[并发底层原理](./Appendix-Low-Level-Concurrency.md)涵盖了其他一些内容，但是你还想探索**java.util.concurrent**的Javadocs。 但是要小心，因为某些库组件已被新的更好的组件所取代。

### 考虑为并发设计的语言

通常，请谨慎地使用并发。 如果需要使用它，请尝试使用最现代的方法：并行流或**CompletableFutures**。 这些功能旨在（假设你不尝试共享内存）使你摆脱麻烦（在Java的世界范围内）。

如果你的并发问题变得比高级Java构造所支持的问题更大且更复杂，请考虑使用专为并发设计的语言，仅在需要并发的程序部分中使用这种语言是有可能的。 在撰写本文时，JVM上最纯粹的功能语言是Clojure（Lisp的一种版本）和Frege（Haskell的一种实现）。这些使你可以在其中编写应用程序的并发部分语言，并通过JVM轻松地与你的主要Java代码进行交互。 或者，你可以选择更复杂的方法，即通过外部功能接口（FFI）将JVM之外的语言与另一种为并发设计的语言进行通信。[^11]

你很容易被一种语言绑定，迫使自己尝试使用该语言来做所有事情。 一个常见的示例是构建HTML / JavaScript用户界面。 这些工具确实很难使用，令人讨厌，并且有许多库允许你通过使用自己喜欢的语言编写代码来生成这些工具（例如，**Scala.js**允许你在Scala中完成代码）。

心理上的便利是一个合理的考虑因素。 但是，我希望我在本章（以及附录：[并发底层原理](./Appendix-Low-Level-Concurrency.md)）中已经表明Java并发是一个你可能无法逃离很深的洞。 与Java语言的任何其他部分相比，在视觉上检查代码同时记住所有陷阱所需要的的知识要困难得多。

无论使用特定的语言、库使得并发看起来多么简单，都要将其视为一种妖术，因为总是有东西会在你最不期望出现的时候咬你。

### 拓展阅读

《Java Concurrency in Practice》，出自Brian Goetz，Tim Peierls， Joshua Bloch，Joseph Bowbeer，David Holmes和 Doug Lea (Addison Wesley，2006年)——这些基本上就是Java并发世界中的名人名单了《Java Concurrency in Practice》第二版，出自 Doug Lea (Addison-Wesley，2000年)。尽管这本书出版时间远远早于Java 5发布，但Doug的大部分工作都写入了**java.util.concurrent**库。因此，这本书对于全面理解并发问题至关重要。 它超越了Java，讨论了跨语言和技术的并发编程。 尽管它在某些地方可能很钝，但值得多次重读（最好是在两个月之间进行消化）。 道格（Doug）是世界上为数不多的真正了解并发编程的人之一，因此这是值得的。

[^2]: 可以说，试图将并发性用于后续语言是一种注定要失败的方法，但你必须得出自己的结论
[^3]: 有人谈论在Java——10中围绕泛型做一些类似的基本改进，这将是非常令人难以置信的。
[^4]: 这是一种有趣的，虽然不一致的方法。通常，我们期望在公共接口上使用显式类表示不同的行为
[^5]: 不，永远不会有纯粹的功能性Java。我们所能期望的最好的是一种在JVM上运行的全新语言。
[^6]: 当两个任务能够更改其状态以使它们不会被阻止但它们从未取得任何有用的进展时，你也可以使用活动锁。
[^7]: 而不是超线程；通常每个内核有两个超线程，并且在询问内核数量时，本书所使用的Java版本会报告超线程的数量。超线程产生了更快的上下文切换，但是只有实际的内核才真的工作，而不是超线程。 ↩
[^8]: 库就在那里用于调用，而语言本身就被设计用于此目的，但实际上它很少发生，以至于可以说”没有“。↩
[^9]: 举例来说，如果没有Flyweight设计模式，在工程中创建数百万个对象用于有限元分析可能在Java中不可行。↩
[^10]: 在科学中，虽然从来没有一种理论被证实过，但是一种理论必须是可证伪的才有意义。而对于并发性，我们大部分时间甚至都无法得到这种可证伪性。↩
[^11]: 尽管**Go**语言显示了FFI的前景，但在撰写本文时，它并未提供跨所有平台的解决方案
